'use strict';

const Boom = require('@hapi/boom');

module.exports = {
    name: 'access',
    scheme: (server, options) => ({

        authenticate: async (request, h) => {

            const { authorization: access } = request.headers;
            const { userService } = request.services();

            if (access && access.length > 0) {
                try {
                    const user = await userService.validateAccessKey(access);

                    return h.authenticated({
                        credentials: access,
                        artifacts: { user }
                    });
                }
                catch (error) {
                    throw Boom.unauthorized(null, 'access');
                }
            }

            throw Boom.unauthorized(null, 'access');
        }
    })
};
