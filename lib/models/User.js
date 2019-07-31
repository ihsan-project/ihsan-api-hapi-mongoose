'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class User extends Schwifty.Model {

    static get tableName() {

        return 'Users';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer(),
            firstName: Joi.string(),
            lastName: Joi.string()
        });
    }
};
