'use strict';

const Joi = require('@hapi/joi');

module.exports = {
    method: 'POST',
    path: '/authorizations',
    options: {
        auth: 'key',
        validate: {
            payload: Joi.object({
                uuid: Joi.string().required(),
                digest: Joi.string().required(),
                email: Joi.string().email().required(),
                firstName: Joi.string().required(),
                platform: Joi.number().integer().required()
            })
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            const createSession = async (transaction) => {

                return await userService.createSession(request.payload, transaction);
            };

            const user = await h.context.transaction(createSession);

            return {
                id: user._id,
                firstName: user.firstName,
                email: user.email,
                access: user.access
            };
        }
    }
};
