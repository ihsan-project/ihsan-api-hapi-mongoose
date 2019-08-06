'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class IntentionState extends Schwifty.Model {

    static get tableName() {

        return 'IntentionStates';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0)
        });
    }
};
