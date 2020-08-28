'use strict';

const Schmervice = require('schmervice');
const Crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const Boom = require('@hapi/boom');
const Constants = require('../constants');

const internals = {
};

module.exports = class UserService extends Schmervice.Service {

    async createSession(payload, transaction) {

        const { User, UserAuthorization } = this.server.models();

        if (payload.platform === Constants.auth_platform.google) {
            console.log('mmi: createSession 1');
            await this.validateGoogleSSO(payload);
        }
        else if (payload.platform < 0) {
            // This is a debug setup to skip digest validation
            // for things like testing the api through CURL
            // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
            //     throw Boom.unauthorized('invalid platform');
            // }
        }
        else {
            throw Boom.unauthorized('invalid platform');
        }

        console.log('mmi: createSession 2');

        let authorization = await UserAuthorization.query(transaction).first().where({ uuid: payload.uuid });
        let user;

        console.log('mmi: createSession 3');

        if (!authorization) { // Check if user exists with some other sso service
            console.log('mmi: createSession 4');
            user = await User.query(transaction).first().where({ email: payload.email });

            console.log('mmi: createSession 5');
            if (user) {
                console.log('mmi: createSession 6');
                authorization = await UserAuthorization.query(transaction).insert({
                    user_id: user.id,
                    uuid: payload.uuid,
                    email: payload.email,
                    platform: payload.platform
                });
            }
        }

        if (!authorization) {
            console.log('mmi: createSession 7');
            user = await User.query(transaction)
                .insert({
                    first_name: payload.first_name,
                    last_name: payload.last_name,
                    email: payload.email
                });

            console.log('mmi: createSession 8');

            authorization = await UserAuthorization.query(transaction).insert({
                user_id: user.id,
                uuid: payload.uuid,
                email: payload.email,
                platform: payload.platform
            });

            console.log('mmi: createSession 9');
        }

        if (!user) {
            console.log('mmi: createSession 10');
            user = await User.query(transaction).findById(authorization.user_id);
            console.log('mmi: createSession 11');
        }

        if (user.access && user.access.length > 0) {
            console.log('mmi: createSession 12');
            // User is logging in, not creating account
            return user;
        }

        console.log('mmi: createSession 13');
        const access = await this.accessKey();
        console.log('mmi: createSession 14');
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

        console.log('mmi: validateGoogleSSO 1', digest);
        const authClient = new OAuth2Client(process.env.GOOGLE_SSO_CLIENT_ID);
        console.log('mmi: validateGoogleSSO 2', authClient);
        const ticket = await authClient.verifyIdToken({
            idToken: digest,
            audience: process.env.GOOGLE_SSO_CLIENT_ID
        });

        console.log('mmi: validateGoogleSSO 3');

        // A bad digest will fail with an exception and it won't come here

        const userId = ticket.getPayload().sub;
        console.log('mmi: validateGoogleSSO 4');
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
