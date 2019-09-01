'use strict';

const Schmervice = require('schmervice');
const JWT = require('jsonwebtoken');

const internals = {
};

module.exports = class UserService extends Schmervice.Service {

    // 1. Find a `UserAuthentication` with the `uuid` or `email`
    // 2. If found, create JWT and pass back token with `UserAuthentication.user`
    // 3. If not found,
    //   - create a `User` with the `email`
    //   - create a `UserAuthentication` for user
    //   - create a JWT and pass it back with `User`
    async createSession(payload, transaction) {

        const { User, UserAuthentication, UserStatistics } = this.server.models();

        let authentication = await UserAuthentication.query(transaction).first().where({ uuid: payload.uuid });

        if (!authentication) {
            authentication = await UserAuthentication.query(transaction).first().where({ email: payload.email });
        }

        if (!authentication) {
            const user = await User.query(transaction)
                .insert({
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email
                });

            const userStatistics = await UserStatistics.query(transaction)
                .insert({
                    userId: user.id
                });

            await User.query(transaction)
                .patch({ statisticsId: userStatistics.id })
                .where('id', user.id);

            authentication = await UserAuthentication.query(transaction).insert({
                userId: user.id,
                uuid: payload.uuid,
                email: payload.email,
                platform: payload.platform
            });
        }

        const user = await User.query(transaction).findById(authentication.userId);
        const jwt = await this.createToken(user.id);

        return {
            user, // TODO: Limit what to present
            jwt
        };
    }

    async createToken(id) {

        return await JWT.sign({ id }, this.options.jwt_secret_key, {
            algorithm: 'HS256', // TODO: This might be way too expensive to decode each api call right?
            expiresIn: '30 days' // TODO: Need to corrolate this with `expiresAt`
        });
    }
};
