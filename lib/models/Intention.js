'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class Intention extends Schwifty.Model {

    static get tableName() {

        return 'Intentions';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer()
        });
    }
};
