'use strict';

module.exports = {
    method: 'GET',
    path: '/books',
    options: {
        auth: 'access',
        plugins: {
            pagination: {
                enabled: true
            }
        },
        handler: async (request, h) => {

            const { Book } = request.models;
            const { page, limit } = request.query;

            const books = await Book.find().limit(limit).skip((page - 1) * limit).sort({ type: 'asc' }).exec();

            console.log('mmi: books', books);

            return {
                results: books.results,
                totalCount: books.total
            };
        }
    }
};
