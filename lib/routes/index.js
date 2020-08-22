'use strict';

module.exports = {
    method: 'GET',
    path: '/',
    options: {
        handler: (request, h) => {

            const version = '1.1';

            console.log('Get version', version);

            return {
                version
            };
        }
    }
};
