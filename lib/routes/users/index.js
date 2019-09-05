'use strict';

module.exports = {
    method: 'GET',
    path: '/users',
    options: {
        auth: 'access',
        // eslint-disable-next-line require-await
        handler: async (request, h) => {

            const { artifacts: { user } } = request.auth;

            return user;
        }
    }
};
