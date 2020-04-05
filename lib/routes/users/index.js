'use strict';

module.exports = {
    method: 'GET',
    path: '/users',
    options: {
        auth: {
            strategies: ['access', 'key']
        },
        handler: (request, h) => {

            const { artifacts: { user } } = request.auth;

            return user;
        }
    }
};
