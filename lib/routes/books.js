'use strict';

module.exports = {
    method: 'GET',
    path: '/books',
    options: {
        auth: 'simple',
        // eslint-disable-next-line require-await
        handler: async (request, h) => {

            const { Book } = request.models();

            return await Book.query().orderBy('id');
        }
    }
};
