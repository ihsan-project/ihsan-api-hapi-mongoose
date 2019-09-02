'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class IntentionState extends Schwifty.Model {

    static get tableName() {

        return 'intention_states';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            intentionId: Joi.number().integer().greater(0).required(),
            state: Joi.string().required(),
            createdAt: Joi.date()
        });
    }

    static get relationMappings() {

        const Intention = require('./intention');

        return {
            intention: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: Intention,
                join: {
                    from: 'intention_states.intentionId',
                    to: 'intentions.id'
                }
            }
        };
    }
};
