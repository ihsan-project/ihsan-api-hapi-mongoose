'use strict';

const Boom = require('@hapi/boom');

module.exports = {
    name: 'access',
    scheme: (server, options) => ({

        authenticate: (request, h) => {

            const { authorization } = request.headers;
            const { userService } = request.services();

            if (authorization && authorization.length > 0) {
                userService.validateToken('test');
                console.log('access', authorization);

                return h.authenticated({
                    credentials: { monkey: 'butt' },
                    artifacts: 'poo'
                });
            }

            throw Boom.unauthorized(null, 'access');
        }
    })
};
