'use strict';

const Schmervice = require('@hapipal/schmervice');

const internals = {
};

module.exports = class ContentService extends Schmervice.Service {

    async listBooks(page, limit) {

        const { Book } = this.server.models;

        return await Book.find().limit(limit).skip((page - 1) * limit).sort({ type: 'asc' }).exec();
    }
};
