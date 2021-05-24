'use strict';

const Mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new Mongoose.Schema({
    id: Number,
    statistics_id: Number,
    first_name: String,
    last_name: String,
    access: String,
    email: String,
});

schema.methods.joiValidate = (obj) => {
	return Joi.validate(obj, {
        id: Joi.number().integer().greater(0),
        statistics_id: Joi.number().integer().greater(0),
        first_name: Joi.string().required(),
        last_name: Joi.string(),
        access: Joi.string(),
        email: Joi.string().email().required()
    });
};

module.exports = { name: 'User', schema };
