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

            const { Book } = request.models();
            const { page, limit } = request.query;

            const books = await Book.query().orderBy('id').page(page - 1, limit);

            return {
                results: books.results,
                totalCount: books.total
            };
        }
    }
};
