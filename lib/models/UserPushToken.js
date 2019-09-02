'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class UserPushToken extends Schwifty.Model {

    static get tableName() {

        return 'user_push_tokens';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            user_id: Joi.number().integer().greater(0).required(),
            token: Joi.string().required(),
            platform: Joi.string().required(),
            created_at: Joi.date().required(),
            expires_at: Joi.date().required()
        });
    }

    static get relationMappings() {

        const User = require('./user');

        return {
            user: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'user_push_tokens.user_id',
                    to: 'users.id'
                }
            }
        };
    }
};
