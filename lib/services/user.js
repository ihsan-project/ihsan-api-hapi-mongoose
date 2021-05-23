'use strict';

const Schmervice = require('@hapipal/schmervice');
const Crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const Boom = require('@hapi/boom');
const Constants = require('../constants');

const internals = {
};

module.exports = class UserService extends Schmervice.Service {

    async createSession(payload, transaction) {

        const { User, UserAuthorization } = this.server.models;
        const { Types: { ObjectId } } = this.server.plugins['hapi-mongoose'].lib;

        if (payload.platform === Constants.auth_platform.google) {
            await this.validateGoogleSSO(payload);
        }
        else if (payload.platform < 0) {
            // This is a debug setup to skip digest validation
            // for things like testing the api through CURL
            if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
                throw Boom.unauthorized('invalid platform');
            }
        }
        else {
            throw Boom.unauthorized('invalid platform');
        }

        let authorization = await UserAuthorization.findById(ObjectId(payload.uuid)).session(transaction).exec();
        let user;

        if (!authorization) { // Check if user exists with some other sso service
            user = await User.findOne({ email: payload.email }).session(transaction).exec();

            if (user) {
                authorization = await UserAuthorization.query(transaction).insert({
                    user_id: user.id,
                    uuid: payload.uuid,
                    email: payload.email,
                    platform: payload.platform
                });
            }
        }

        if (!authorization) {
            user = await User.query(transaction)
                .insert({
                    first_name: payload.first_name,
                    last_name: payload.last_name,
                    email: payload.email
                });

            authorization = await UserAuthorization.query(transaction).insert({
                user_id: user.id,
                uuid: payload.uuid,
                email: payload.email,
                platform: payload.platform
            });
        }

        if (!user) {
            user = await User.findById(ObjectId(authorization.user_id)).session(transaction).exec();
        }

        if (user.access && user.access.length > 0) {
            // User is logging in, not creating account
            return user;
        }

        const access = await this.accessKey();

        return await user.$query(transaction)
            .patchAndFetch({ access });
    }

    async accessKey() {

        const promise = new Promise((resolve, reject) => {

            // https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
            Crypto.randomBytes(48, (_err, buffer) => {

                resolve(buffer.toString('hex'));
            });
        });

        return await promise;
    }

    async validateAccessKey(access) {

        const { User } = this.server.models();

        return await User.query().throwIfNotFound().findOne({ access });
    }

    async validateGoogleSSO(payload) {

        const { digest, uuid } = payload;

        const authClient = new OAuth2Client(process.env.GOOGLE_SSO_CLIENT_ID);

        // eslint-disable-next-line @hapi/hapi/no-var
        var ticket;
        try {
            ticket = await authClient.verifyIdToken({
                idToken: digest,
                audience: process.env.GOOGLE_SSO_CLIENT_ID
            });
        }
        catch (err) {
            console.log('verifyIdToken failed', err);
            throw Boom.unauthorized('token validation failed');
        }

        // A bad digest will fail with an exception and it won't come here

        const userId = ticket.getPayload().sub;
        if (userId !== uuid) {
            throw Boom.unauthorized('invalid digest');
        }

        // TODO: ticket.payLoad().name would make a good displayName (it has both first and last together)
        // TODO: Capture profile pic from ticket.getPayload().picture
        // TODO: ticket.getPayload().locale = 'en' would be helpful to retain when going international
    }

    async findUserById(id, transaction) {

        const { User } = this.server.models();

        return await User.query(transaction).throwIfNotFound().findById(id);
    }
};
