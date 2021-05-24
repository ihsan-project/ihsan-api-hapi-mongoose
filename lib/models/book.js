'use strict';

const Mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new Mongoose.Schema({
    id: Number,
    slug_id: String,
    type: Number,
    title: String
});

schema.methods.joiValidate = (obj) => {

    return Joi.validate(obj, {
        id: Joi.number().integer().greater(0),
        slug_id: Joi.string().required(),
        type: Joi.number().integer().required(),
        title: Joi.string().required()
    });
};

module.exports = { name: 'Book', schema };
