'use strict';

const Mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new Mongoose.Schema({
    id: Number,
    user_id: Number,
    uuid: String,
    email: String,
    platform: Number
});

schema.methods.joiValidate = (obj) => {

    return Joi.validate(obj, {
        id: Joi.number().integer().greater(0),
        user_id: Joi.number().integer().greater(0).required(),
        uuid: Joi.string().required(),
        email: Joi.string().email().required(),
        platform: Joi.number().integer().required()
    });
};

module.exports = { name: 'UserAuthorization', schema };
