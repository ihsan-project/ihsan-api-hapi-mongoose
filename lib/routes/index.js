'use strict';

module.exports = {
    method: 'GET',
    path: '/',
    options: {
        handler: (request, h) => {

            const version = '1.2';

            console.log('Get version', version);

            return {
                version
            };
        }
    }
};
