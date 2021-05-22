'use strict';

const Mongoose = require('mongoose');
const Joi = require('@hapi/joi');

module.exports = {
    name: 'UserStatistics',
    schema: new Mongoose.Schema({
        id: Number,
        user_id: Number,
        intentions_created: Number,
        intentions_finished: Number,
        intentions_aborted: Number,
        challenges_contributed: Number,
        challenges_moderated: Number
    })

    // static get tableName() {

    //     return 'user_statistics';
    // }

    // static get joiSchema() {

    //     return Joi.object({
    //         id: Joi.number().integer().greater(0),
    //         user_id: Joi.number().integer().greater(0).required(),
    //         intentions_created: Joi.number().integer().greater(0),
    //         intentions_finished: Joi.number().integer().greater(0),
    //         intentions_aborted: Joi.number().integer().greater(0),
    //         challenges_contributed: Joi.number().integer().greater(0),
    //         challenges_moderated: Joi.number().integer().greater(0)
    //     });
    // }

    // static get relationMappings() {

    //     const User = require('./user');

    //     return {
    //         user: {
    //             relation: Schwifty.Model.BelongsToOneRelation,
    //             modelClass: User,
    //             join: {
    //                 from: 'user_statistics.user_id',
    //                 to: 'users.id'
    //             }
    //         }
    //     };
    // }
};
