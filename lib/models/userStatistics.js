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
            created_at: Joi.date().required(),
            user_id: Joi.number().integer().greater(0).required(),
            intentions_created: Joi.number().integer().greater(0),
            intentions_finished: Joi.number().integer().greater(0),
            intentions_aborted: Joi.number().integer().greater(0),
            challenges_contributed: Joi.number().integer().greater(0),
            challenges_moderated: Joi.number().integer().greater(0)
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
