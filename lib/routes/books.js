'use strict';

module.exports = {
    method: 'GET',
    path: '/books',
    options: {
        auth: 'access',
        handler: async (request, h) => {

            const { Book } = request.models();

            const books = await Book.query().orderBy('id');
            const total = await Book.query().resultSize();

            return {
                books,
                total
            };
        }
    }
};
