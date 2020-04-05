'use strict';

module.exports = {
    method: 'GET',
    path: '/users/{id}',
    options: {
        auth: {
            strategies: ['access', 'key']
        },
        // eslint-disable-next-line require-await
        handler: async (request, h) => {

            const { id } = request.params;
            const { userService } = request.services();

            const getUser = async (transaction) => {

                return await userService.findUserById(id, transaction);
            };

            return await h.context.transaction(getUser);
        }
    }
};
