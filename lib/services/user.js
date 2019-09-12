'use strict';

const Schmervice = require('schmervice');
const Crypto = require('crypto');

const internals = {
};

module.exports = class UserService extends Schmervice.Service {

    async createSession(payload, transaction) {

        const { User, UserAuthentication } = this.server.models();

        let authentication = await UserAuthentication.query(transaction).first().where({ uuid: payload.uuid });
        let user;

        if (!authentication) { // Check if user exists with some other sso service
            user = await User.query(transaction).first().where({ email: payload.email });

            if (user) {
                authentication = await UserAuthentication.query(transaction).insert({
                    user_id: user.id,
                    uuid: payload.uuid,
                    email: payload.email,
                    platform: payload.platform
                });
            }
        }

        if (!authentication) {
            user = await User.query(transaction)
                .insert({
                    first_name: payload.first_name,
                    last_name: payload.last_name,
                    email: payload.email
                });

            authentication = await UserAuthentication.query(transaction).insert({
                user_id: user.id,
                uuid: payload.uuid,
                email: payload.email,
                platform: payload.platform
            });
        }

        if (!user) {
            user = await User.query(transaction).findById(authentication.user_id);
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

    async findUserById(id, transaction) {

        const { User } = this.server.models();

        return await User.query(transaction).throwIfNotFound().findById(id);
    }
};
