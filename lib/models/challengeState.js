'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class ChallengeState extends Schwifty.Model {

    static get tableName() {

        return 'challenge_states';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            created_at: Joi.date().required(),
            challenge_id: Joi.number().integer().greater(0).required(),
            state: Joi.string().required()
        });
    }

    static get relationMappings() {

        const Challenge = require('./challenge');

        return {
            challenge: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: Challenge,
                join: {
                    from: 'challenge_states.challenge_id',
                    to: 'challenges.id'
                }
            }
        };
    }
};
