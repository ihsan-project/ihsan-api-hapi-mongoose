'use strict';

const Joi = require('@hapi/joi');

module.exports = {
    method: 'POST',
    path: '/sessions',
    options: {
        validate: {
            payload: {
                uuid: Joi.string().required(),
                email: Joi.string().email().required(),
                first_name: Joi.string().required(),
                platform: Joi.number().integer().required()
            }
        },
        // eslint-disable-next-line require-await
        handler: async (request, h) => {

            const { userService } = request.services();

            const createSession = async (transaction) => {

                return await userService.createSession(request.payload, transaction);
            };

            return await h.context.transaction(createSession);
        }
    }
};
