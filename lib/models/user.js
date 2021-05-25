'use strict';

const Mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new Mongoose.Schema({
    first_name: String,
    last_name: String,
    access: String,
    email: String
});

schema.methods.joiValidate = (obj) => {

    return Joi.validate(obj, {
        first_name: Joi.string().required(),
        last_name: Joi.string(),
        access: Joi.string(),
        email: Joi.string().email().required()
    });
};

module.exports = { name: 'User', schema };
