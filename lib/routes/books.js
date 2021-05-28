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

            const { page, limit } = request.query;
            const { contentService } = request.services();

            return await contentService.listBooks(page, limit);
        }
    }
};
