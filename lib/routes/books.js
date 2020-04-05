'use strict';

module.exports = {
    method: 'GET',
    path: '/books',
    options: {
        auth: 'access',
        handler: async (request, h) => {

            const { Book } = request.models();

            return await Book.query().orderBy('id');
        }
    }
};
