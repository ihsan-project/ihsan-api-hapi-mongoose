'use strict';

module.exports = {
    method: 'GET',
    path: '/users',
    options: {
        auth: 'access',
        // eslint-disable-next-line require-await
        handler: async (request, h) => {

            const { credentials: { uid } } = request.auth;
            const { userService } = request.services();

            const getUser = async (transaction) => {

                return await userService.findUserById(uid, transaction);
            };

            return await h.context.transaction(getUser);
        }
    }
};
