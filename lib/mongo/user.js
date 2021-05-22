'use strict';

const Mongoose = require('mongoose');
const Joi = require('@hapi/joi');

module.exports = {
    name: 'User',
    schema: new Mongoose.Schema({
        id: Number,
        statistics_id: Number,
        first_name: String,
        last_name: String,
        access: String,
        email: String,
    })

    // static get tableName() {

    //     return 'users';
    // }

    // static get joiSchema() {

    //     return Joi.object({
    //         id: Joi.number().integer().greater(0),
    //         statistics_id: Joi.number().integer().greater(0),
    //         first_name: Joi.string().required(),
    //         last_name: Joi.string(),
    //         access: Joi.string(),
    //         email: Joi.string().email().required()
    //     });
    // }

    // static get relationMappings() {

    //     const UserStatistics = require('./userStatistics');

    //     return {
    //         statistics: {
    //             relation: Schwifty.Model.BelongsToOneRelation,
    //             modelClass: UserStatistics,
    //             join: {
    //                 from: 'users.statistics_id',
    //                 to: 'user_statistics.id'
    //             }
    //         }
    //     };
    // }


    // async $afterInsert(context) {

    //     await super.$afterInsert(context);

    //     const UserStatistics = require('./userStatistics');

    //     const userStatistics = await UserStatistics.query(context.transaction)
    //         .insert({
    //             user_id: this.id
    //         });

    //     this.$query(context.transaction)
    //         .patch({ statistics_id: userStatistics.id });
    // }
};
