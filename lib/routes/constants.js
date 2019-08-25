'use strict';

module.exports = {
    method: 'GET',
    path: '/constants',
    options: {
        // eslint-disable-next-line require-await
        handler: async (request, h) => {

            const { constantsService } = request.services();

            return constantsService.settingsforUser();
        }
    }
};
