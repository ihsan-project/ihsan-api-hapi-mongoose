'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class Challenge extends Schwifty.Model {

    static get tableName() {

        return 'challenges';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            created_at: Joi.date().required(),
            user_id: Joi.number().integer().greater(0).required(),
            book_id: Joi.number().integer().greater(0).required(),
            current_state_id: Joi.number().integer().greater(0).required(),
            total_parts: Joi.number().integer().required(),
            complete_at: Joi.date()
        });
    }

    static get relationMappings() {

        const User = require('./user');
        const Book = require('./book');
        const ChallengeState = require('./challengeState');

        return {
            user: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'challenges.user_id',
                    to: 'users.id'
                }
            },
            book: {
                relation: Schwifty.Model.HasOneRelation,
                modelClass: Book,
                join: {
                    from: 'challenges.book_id',
                    to: 'books.id'
                }
            },
            currentState: {
                relation: Schwifty.Model.HasOneRelation,
                modelClass: ChallengeState,
                join: {
                    from: 'challenges.current_state_id',
                    to: 'challenge_states.id'
                }
            }
        };
    }
};
