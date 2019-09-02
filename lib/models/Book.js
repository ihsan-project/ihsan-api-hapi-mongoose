'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class Book extends Schwifty.Model {

    static get tableName() {

        return 'books';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            slug_id: Joi.string().required(),
            type: Joi.number().integer().required(),
            title: Joi.string().required()
        });
    }
};
