'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class UserAuthentication extends Schwifty.Model {

    static get tableName() {

        return 'UserAuthentications';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0).required(),
            userId: Joi.number().integer().greater(0).required(),
            uuid: Joi.string().required(),
            email: Joi.string().email().required(),
            platform: Joi.number().integer().required()
        });
    }

    static get relationMappings() {

        const User = require('./User');

        return {
            user: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'UserAuthentications.userId',
                    to: 'Users.id'
                }
            }
        };
    }
};
