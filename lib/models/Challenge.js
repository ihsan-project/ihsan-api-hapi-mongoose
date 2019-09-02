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
            userId: Joi.number().integer().greater(0).required(),
            bookId: Joi.number().integer().greater(0).required(),
            currentStateId: Joi.number().integer().greater(0).required(),
            totalParts: Joi.number().integer().required(),
            completeAt: Joi.date()
        });
    }

    static get relationMappings() {

        const User = require('./User');
        const Book = require('./book');
        const ChallengeState = require('./challengeState');

        return {
            user: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'challenges.userId',
                    to: 'Users.id'
                }
            },
            book: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: Book,
                join: {
                    from: 'challenges.bookId',
                    to: 'books.id'
                }
            },
            currentState: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: ChallengeState,
                join: {
                    from: 'challenges.currentStateId',
                    to: 'challenge_states.id'
                }
            }
        };
    }
};
