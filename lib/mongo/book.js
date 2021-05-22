'use strict';

const Mongoose = require('mongoose');
const Joi = require('@hapi/joi');

module.exports = {
    name: 'Book',
    schema: new Mongoose.Schema({
        id: Number,
        slug_id: String,
        type: Number,
        title: String,
    })

    // static get tableName() {

    //     return 'books';
    // }

    // static get joiSchema() {

    //     return Joi.object({
    //         id: Joi.number().integer().greater(0),
    //         slug_id: Joi.string().required(),
    //         type: Joi.number().integer().required(),
    //         title: Joi.string().required()
    //     });
    // }
};
