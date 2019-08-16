'use strict';

module.exports = {
    method: 'GET',
    path: '/books',
    options: {
        handler: async (request, h) => {

            const { Book } = request.models();

            return Book.query();
        }
    }
};
