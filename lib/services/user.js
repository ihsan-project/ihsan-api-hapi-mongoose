'use strict';

const Schmervice = require('schmervice');
const Constants = require('../constants');

const internals = {
};

module.exports = class UserService extends Schmervice.Service {

    // 1. Find a `UserAuthentication` with the `uuid`
    // 2. If found, find a `UserSession` with that `UserAuthentication` that has not expired
    //   a. If found, pass it back
    //   b. If not found, create a `UserSession` and pass it back
    // 3. If not found,
    //   - create a `User` with the `email`
    //   - create a `UserAuthentication` for user
    //   - create a `UserSession` for user and pass it back
    async createSession(payload, transaction) {

        const { User, UserAuthentication, UserSession, UserStatistics } = this.server.models();

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
                .update({ statisticsId: userStatistics.id })
                .where('id', user.id);

            authentication = await UserAuthentication.query(transaction).insert({
                userId: authentication.user.id,
                authenticationId: authentication.id,
                token: "123232ababd", // TODO
                createdAt: new Date(),
                expiresAt: new Date() // TODO: Need to set this for later
            });
        }

        let session = await UserSession.query(transaction).first().where({ authentication });

        // TODO: make certain session hasn't expired
        if (!session) {
            session = await UserSession.query(transaction).insert({
                userId: authentication.user.id,
                authenticationId: authentication.id,
                token: "123232ababd", // TODO
                createdAt: new Date(),
                expiresAt: new Date() // TODO: Need to set this for later
            });
        }

        return session;
    }
};
