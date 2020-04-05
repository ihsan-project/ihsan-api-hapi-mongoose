'use strict';

const Boom = require('@hapi/boom');

module.exports = {
    name: 'access',
    scheme: (server, options) => ({

        authenticate: async (request, h) => {

            const { authorization: access } = request.headers;
            const { userService } = request.services();

            // Hapi does support multiple auth strategies per API, but these behave like ORs
            // When requiring an AND of two or more auth strategies, this is one way of doing it.
            // This runs the key auth strategy.
            // Thus all access auth strategies will also run the key auth scheme
            await server.auth.test('key', request);
            // key auth failure won't get beyond this point

            if (access && access.length > 0) {
                try {
                    const user = await userService.validateAccessKey(access);

                    const test = h.authenticated({
                        credentials: access,
                        artifacts: { user }
                    });

                    return test;
                }
                catch (error) {
                    throw Boom.unauthorized('invalid access');
                }
            }

            throw Boom.unauthorized('invalid access');
        }
    })
};
