'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');
const Moment = require('moment');

module.exports = class User extends Schwifty.Model {

    static get tableName() {

        return 'users';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            created_at: Joi.date().required(),
            statistics_id: Joi.number().integer().greater(0),
            first_name: Joi.string().required(),
            last_name: Joi.string(),
            access: Joi.string(),
            email: Joi.string().email().required()
        });
    }

    static get relationMappings() {

        const UserStatistics = require('./userStatistics');

        return {
            statistics: {
                relation: Schwifty.Model.HasOneRelation,
                modelClass: UserStatistics,
                join: {
                    from: 'users.id',
                    to: 'user_statistics.user_id'
                }
            }
        };
    }


    async $afterInsert(context) {

        await super.$afterInsert(context);

        const UserStatistics = require('./userStatistics');

        const userStatistics = await UserStatistics.query(context.transaction)
            .insert({
                user_id: this.id,
                created_at: Moment().format()
            });

        this.$query(context.transaction)
            .patch({ statistics_id: userStatistics.id });
    }
};
