'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class ModelName extends Schwifty.Model {

    static get tableName() {

        return 'User';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer(),
            firstName: Joi.string(),
            lastName: Joi.string()
        });
    }
};
