'use strict';

const Schmervice = require('@hapipal/schmervice');
const Crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const Boom = require('@hapi/boom');
const Constants = require('../constants');

const internals = {
};

module.exports = class ContentService extends Schmervice.Service {

    async listBooks(page, limit) {

        const { Book } = this.server.models;

        return await Book.find().limit(limit).skip((page - 1) * limit).sort({ type: 'asc' }).exec();
    }
};
