'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class Challenge extends Schwifty.Model {

    static get tableName() {

        return 'Challenges';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer()
        });
    }
};
