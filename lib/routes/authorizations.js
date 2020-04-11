'use strict';

const Joi = require('@hapi/joi');

module.exports = {
    method: 'POST',
    path: '/authorizations',
    options: {
        auth: 'key',
        validate: {
            payload: {
                uuid: Joi.string().required(),
                email: Joi.string().email().required(),
                first_name: Joi.string().required(),
                platform: Joi.number().integer().required()
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            const createSession = async (transaction) => {

                return await userService.createSession(request.payload, transaction);
            };

            const user = await h.context.transaction(createSession);

            return {
                ...user // TODO: Need a presenter
            };
        }
    }
};
