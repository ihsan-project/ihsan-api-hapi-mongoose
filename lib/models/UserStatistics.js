'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class UserStatistics extends Schwifty.Model {

    static get tableName() {

        return 'UserStatistics';
    }

    static get joiSchema() {

        return Joi.object({}); // eslint-disable-line no-undef
    }
};
