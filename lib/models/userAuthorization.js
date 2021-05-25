'use strict';

const Mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new Mongoose.Schema({
    userId: Mongoose.Schema.ObjectId,
    uuid: String,
    email: String,
    platform: Number
});

schema.methods.joiValidate = (obj) => {

    return Joi.validate(obj, {
        userId: Joi.number(),
        uuid: Joi.string().required(),
        email: Joi.string().email().required(),
        platform: Joi.number().integer().required()
    });
};

module.exports = { name: 'UserAuthorization', schema };
