'use strict';

const Mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new Mongoose.Schema({
    firstName: String,
    lastName: String,
    access: String,
    email: String
});

schema.methods.joiValidate = (obj) => {

    return Joi.validate(obj, {
        firstName: Joi.string().required(),
        lastName: Joi.string(),
        access: Joi.string(),
        email: Joi.string().email().required()
    });
};

module.exports = { name: 'User', schema };
