'use strict';

const Schwifty = require('@hapipal/schwifty');
const Joi = require('@hapi/joi');

module.exports = class UserAuthorization extends Schwifty.Model {

    static get tableName() {

        return 'user_authorizations';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            created_at: Joi.date().required(),
            user_id: Joi.number().integer().greater(0).required(),
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
                    from: 'user_authorizations.user_id',
                    to: 'users.id'
                }
            }
        };
    }
};
