'use strict';

const Boom = require('@hapi/boom');

module.exports = {
    name: 'access',
    scheme: (server, options) => ({

        authenticate: async (request, h) => {

            const { authorization: access } = request.headers;
            const { userService } = request.services();

            console.log('mmi: 1');

            if (access && access.length > 0) {
                try {
                    const user = await userService.validateAccessKey(access);

                    return h.authenticated({
                        credentials: access,
                        artifacts: { user }
                    });
                }
                catch (error) {
                    throw Boom.unauthorized(null, 'invalid access');
                }
            }

            // An empty message will allow other strategies in the pipeline to run
            throw Boom.unauthorized(null, 'invalid access');
        }
    })
};
