'use strict';

const Joi = require('@hapi/joi');

module.exports = {
    method: 'GET',
    path: '/constants/{version?}',
    options: {
        validate: {
            params: {
                version: Joi.number().default(0)
            }
        },
        // eslint-disable-next-line require-await
        handler: async (request, h) => {

            const { version } = request.params;
            const { constantsService } = request.services();

            const constants = constantsService.settingsforUser(null, version, null);

            if (!constants) {
                return h.response().code(204);
            }

            return constants;
        }
    }
};
