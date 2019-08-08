'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class Challenge extends Schwifty.Model {

    static get tableName() {

        return 'Challenges';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0).required(),
            userId: Joi.number().integer().greater(0).required(),
            bookId: Joi.number().integer().greater(0).required(),
            currentStateId: Joi.number().integer().greater(0).required(),
            totalParts: Joi.number().integer().required(),
            completeAt: Joi.date()
        });
    }

    static get relationMappings() {

        const User = require('./User');
        const Book = require('./Book');
        const ChallengeState = require('./ChallengeState');

        return {
            user: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'Challenges.userId',
                    to: 'Users.id'
                }
            },
            book: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: Book,
                join: {
                    from: 'Challenges.bookId',
                    to: 'Books.id'
                }
            },
            currentState: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: ChallengeState,
                join: {
                    from: 'Challenges.currentStateId',
                    to: 'ChallengeStates.id'
                }
            }
        };
    }
};
