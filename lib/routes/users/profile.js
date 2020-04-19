'use strict';

module.exports = {
    method: 'GET',
    path: '/users/profile',
    options: {
        auth: 'access',
        handler: (request, h) => {

            return request.auth.artifacts.user;
        }
    }
};
