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
                first_name: Joi.string().required(),
                platform: Joi.number().integer().required()
            })
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            console.log('mmi: test 1');

            const createSession = async (transaction) => {

                console.log('mmi: test 2');

                return await userService.createSession(request.payload, transaction);
            };

            const user = await h.context.transaction(createSession);

            return {
                ...user // TODO: Need a presenter
            };
        }
    }
};
