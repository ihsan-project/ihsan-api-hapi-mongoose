'use strict';

const Mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new Mongoose.Schema({
    slug_id: String,
    type: Number,
    title: String
});

schema.methods.joiValidate = (obj) => {

    return Joi.validate(obj, {
        slug_id: Joi.string().required(),
        type: Joi.number().integer().required(),
        title: Joi.string().required()
    });
};

module.exports = { name: 'Book', schema };
