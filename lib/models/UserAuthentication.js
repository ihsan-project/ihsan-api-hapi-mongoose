'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class UserAuthentication extends Schwifty.Model {

    static get tableName() {

        return 'user_authentications';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            userId: Joi.number().integer().greater(0).required(),
            uuid: Joi.string().required(),
            email: Joi.string().email().required(),
            platform: Joi.number().integer().required()
        });
    }

    static get relationMappings() {

        const User = require('./user');

        return {
            user: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'user_authentications.userId',
                    to: 'users.id'
                }
            }
        };
    }
};
