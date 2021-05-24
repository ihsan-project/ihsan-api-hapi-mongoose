'use strict';

module.exports = (server) => ({
    transaction: async (fn) => {

        // https://mongoosejs.com/docs/transactions.html#getting-started-with-transactions
        // Insert a mongodb transaction function in the request context
        // Then can do the following in route handler:
        /*
            const createSession = async (transaction) => {

                return await userService.createSession(request.payload, transaction);
            };

            const user = await h.context.transaction(createSession);
        */

        const { connection } = server.plugins['hapi-mongoose'];

        const session = await connection.startSession();

        await session.withTransaction(() => {

            return fn(session);
        });

        session.endSession();
    }
});
