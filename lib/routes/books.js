'use strict';

module.exports = {
    method: 'GET',
    path: '/books',
    options: {
        // eslint-disable-next-line require-await
        handler: async (request, h) => {

            const { Book } = request.models();

            return Book.query().orderBy('id');
        }
    }
};
