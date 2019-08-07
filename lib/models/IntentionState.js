'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class IntentionState extends Schwifty.Model {

    static get tableName() {

        return 'IntentionStates';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0).required(),
            intentionId: Joi.number().integer().greater(0).required(),
            state: Joi.string().required(),
            createdAt: Joi.date()
        });
    }

    static get relationMappings() {

        const Intention = require('./Intention');

        return {
            intention: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: Intention,
                join: {
                    from: 'IntentionStates.intentionId',
                    to: 'Inentions.id'
                }
            }
        };
    }
};
