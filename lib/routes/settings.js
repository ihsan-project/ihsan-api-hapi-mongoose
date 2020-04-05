'use strict';

const Joi = require('@hapi/joi');

module.exports = {
    method: 'GET',
    path: '/settings/{version?}',
    options: {
        auth: 'key',
        validate: {
            params: {
                version: Joi.number().integer().default(0)
            }
        },
        // eslint-disable-next-line require-await
        handler: async (request, h) => {

            const { version } = request.params;
            const { settingsService } = request.services();

            const settings = settingsService.settingsforUser(null, version, null);

            if (!settings) {
                return h.response().code(204);
            }

            return settings;
        }
    }
};
