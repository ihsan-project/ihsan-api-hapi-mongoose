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
                firstName: Joi.string().required(),
                platform: Joi.number().integer().required()
            }
        },
        // eslint-disable-next-line require-await
        handler: async (request, h) => {

            const { userService } = request.services();

            const session = await userService.createSession(request.payload, null);

            return {
                token: session.token,
                createdAt: session.createdAt,
                expiresAt: session.expiresAt
            };
        }
    }
};
