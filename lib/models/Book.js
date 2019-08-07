'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class Book extends Schwifty.Model {

    static get tableName() {

        return 'Books';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer(),
            slugId: Joi.string().integer().required(),
            type: Joi.string().integer().required(),
            title: Joi.string().integer().required()
        });
    }
};
