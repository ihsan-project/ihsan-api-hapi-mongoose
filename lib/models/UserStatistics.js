'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class UserStatistics extends Schwifty.Model {

    static get tableName() {

        return 'UserStatistics';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            userId: Joi.number().integer().greater(0).required(),
            intentionsCreated: Joi.number().integer().greater(0).required(),
            intentionsFinished: Joi.number().integer().greater(0).required(),
            intentionsAborted: Joi.number().integer().greater(0).required(),
            challengesContributed: Joi.number().integer().greater(0).required(),
            challengesModerated: Joi.number().integer().greater(0).required()
        });
    }

    static get relationMappings() {

        const User = require('./User');

        return {
            user: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'UserStatistics.userId',
                    to: 'Users.id'
                }
            }
        };
    }
};
