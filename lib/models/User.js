'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class User extends Schwifty.Model {

    static get tableName() {

        return 'users';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            statisticsId: Joi.number().integer().greater(0),
            firstName: Joi.string().required(),
            lastName: Joi.string(),
            email: Joi.string().email().required()
        });
    }

    static get relationMappings() {

        const UserStatistics = require('./userStatistics');

        return {
            statistics: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: UserStatistics,
                join: {
                    from: 'users.statisticsId',
                    to: 'user_statistics.id'
                }
            }
        };
    }
};
