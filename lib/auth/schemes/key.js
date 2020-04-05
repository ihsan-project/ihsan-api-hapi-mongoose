'use strict';

const Boom = require('@hapi/boom');

module.exports = {
    name: 'key',
    scheme: (server, options) => ({

        authenticate: (request, h) => {

            const { 'x-api-key': apiKey } = request.headers;

            if (apiKey && apiKey === process.env.API_KEY) {
                return h.authenticated({
                    credentials: apiKey
                });
            }

            // A non-empty message will ensure further strategies don't run
            throw Boom.unauthorized('invalid key');
        }
    })
};
