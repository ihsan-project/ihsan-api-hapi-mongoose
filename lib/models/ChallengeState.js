'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class ChallengeState extends Schwifty.Model {

    static get tableName() {

        return 'ChallengeStates';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            challengeId: Joi.number().integer().greater(0).required(),
            state: Joi.string().required(),
            createdAt: Joi.date()
        });
    }

    static get relationMappings() {

        const Challenge = require('./Challenge');

        return {
            challenge: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: Challenge,
                join: {
                    from: 'ChallengeStates.challengeId',
                    to: 'Challenges.id'
                }
            }
        };
    }
};
