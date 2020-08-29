'use strict';

const Joi = require('@hapi/joi');

module.exports = {
    method: 'GET',
    path: '/settings/{version?}',
    options: {
        auth: 'key',
        validate: {
            params: Joi.object({
                version: Joi.number().integer().default(0)
            })
        },
        // eslint-disable-next-line require-await
        handler: async (request, h) => {

            const { version } = request.params;
            const { settingsService } = request.services();

            const settings = settingsService.settingsforUser(null, version, null);

            const http = require('http');

            const options = {
                host: 'www.google.com',
                port: 80,
                path: '/',
                method: 'GET'
            };

            const req = http.request(options, (res) => {

                console.log('STATUS: ' + res.statusCode);
                console.log('HEADERS: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');

                // eslint-disable-next-line @hapi/hapi/no-var
                var str = '';

                res.on('data', (chunk) => {

                    str += chunk;
                });

                res.on('end', () => {

                    console.log('BODY: ' + str);
                });
            });

            req.on('error', (e) => {

                console.log('problem with request: ' + e.message);
            });

            req.end();

            if (!settings) {
                return h.response().code(204);
            }

            return settings;
        }
    }
};
