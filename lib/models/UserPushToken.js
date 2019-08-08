'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class UserPushToken extends Schwifty.Model {

    static get tableName() {

        return 'UserPushTokens';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0).required(),
            userId: Joi.number().integer().greater(0).required(),
            token: Joi.string().required(),
            platform: Joi.string().required(),
            createdAt: Joi.date().required(),
            expiresAt: Joi.date().required()
        });
    }

    static get relationMappings() {

        const User = require('./User');

        return {
            user: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'UserPushTokens.userId',
                    to: 'Users.id'
                }
            }
        };
    }
};
