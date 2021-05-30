'use strict';

const Schwifty = require('@hapipal/schwifty');
const Joi = require('@hapi/joi');

module.exports = class Intention extends Schwifty.Model {

    static get tableName() {

        return 'intentions';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            created_at: Joi.date().required(),
            user_id: Joi.number().integer().greater(0).required(),
            challenge_id: Joi.number().integer().greater(0).required(),
            current_state_id: Joi.number().integer().greater(0).required(),
            parts: Joi.number().integer().required()
        });
    }

    static get relationMappings() {

        const User = require('./user');
        const Challenge = require('./challenge');
        const IntentionState = require('./intentionState');

        return {
            user: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'intentions.user_id',
                    to: 'users.id'
                }
            },
            challenge: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: Challenge,
                join: {
                    from: 'intentions.challenge_id',
                    to: 'challenges.id'
                }
            },
            currentState: {
                relation: Schwifty.Model.HasOneRelation,
                modelClass: IntentionState,
                join: {
                    from: 'intentions.current_state_id',
                    to: 'intention_states.id'
                }
            }
        };
    }
};
