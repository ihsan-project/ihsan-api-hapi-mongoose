'use strict';

module.exports = {
    method: 'GET',
    path: '/version',
    options: {
        handler: (request, h) => {

            const version = '1.0';

            console.log('Get version', version);

            return {
                version
            };
        }
    }
};
