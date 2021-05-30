'use strict';

const Schmervice = require('@hapipal/schmervice');

const internals = {
};

module.exports = class ContentService extends Schmervice.Service {

    async listBooks(page, limit) {

        const { Book } = this.server.models;

        const books = await Book.find().limit(limit).skip((page - 1) * limit).sort({ order: 'asc' }).exec();
        const totalCount = await Book.countDocuments();

        return {
            totalCount,
            results: books
        };
    }
};
