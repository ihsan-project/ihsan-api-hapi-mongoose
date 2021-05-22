'use strict';

const Mongoose = require('mongoose');
const Joi = require('@hapi/joi');

module.exports = {
    name: 'UserAuthorization',
    schema: new Mongoose.Schema({
        id: Number,
        user_id: Number,
        uuid: String,
        email: String,
        platform: Number,
    })

    // static get tableName() {

    //     return 'user_authorizations';
    // }

    // static get joiSchema() {

    //     return Joi.object({
    //         id: Joi.number().integer().greater(0),
    //         user_id: Joi.number().integer().greater(0).required(),
    //         uuid: Joi.string().required(),
    //         email: Joi.string().email().required(),
    //         platform: Joi.number().integer().required()
    //     });
    // }

    // static get relationMappings() {

    //     const User = require('./user');

    //     return {
    //         user: {
    //             relation: Schwifty.Model.BelongsToOneRelation,
    //             modelClass: User,
    //             join: {
    //                 from: 'user_authorizations.user_id',
    //                 to: 'users.id'
    //             }
    //         }
    //     };
    // }
};
