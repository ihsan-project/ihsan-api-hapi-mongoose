'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class Intention extends Schwifty.Model {

    static get tableName() {

        return 'intentions';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            userId: Joi.number().integer().greater(0).required(),
            challengeId: Joi.number().integer().greater(0).required(),
            currentStateId: Joi.number().integer().greater(0).required(),
            parts: Joi.number().integer().required(),
            createdAt: Joi.date()
        });
    }

    static get relationMappings() {

        const User = require('./User');
        const Challenge = require('./challenge');
        const IntentionState = require('./intentionState');

        return {
            user: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'intentions.userId',
                    to: 'Users.id'
                }
            },
            challenge: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: Challenge,
                join: {
                    from: 'intentions.challengeId',
                    to: 'challenges.id'
                }
            },
            currentState: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: IntentionState,
                join: {
                    from: 'intentions.currentStateId',
                    to: 'intention_states.id'
                }
            }
        };
    }
};
