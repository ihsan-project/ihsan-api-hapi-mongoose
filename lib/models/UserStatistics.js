'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class UserStatistics extends Schwifty.Model {

    static get tableName() {

        return 'user_statistics';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            user_id: Joi.number().integer().greater(0).required(),
            intentionsCreated: Joi.number().integer().greater(0),
            intentionsFinished: Joi.number().integer().greater(0),
            intentionsAborted: Joi.number().integer().greater(0),
            challengesContributed: Joi.number().integer().greater(0),
            challengesModerated: Joi.number().integer().greater(0)
        });
    }

    static get relationMappings() {

        const User = require('./user');

        return {
            user: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'user_statistics.user_id',
                    to: 'users.id'
                }
            }
        };
    }
};
