'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class UserSession extends Schwifty.Model {

    static get tableName() {

        return 'UserSessions';
    }

    static get joiSchema() {

        return Joi.object({}); // eslint-disable-line no-undef
    }
};
