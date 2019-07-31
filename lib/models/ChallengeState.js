'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class ChallengeState extends Schwifty.Model {

    static get tableName() {

        return 'ChallengeStates';
    }

    static get joiSchema() {

        return Joi.object({}); // eslint-disable-line no-undef
    }
};
