'use strict';

module.exports = (server, options) => ({
    scheme: 'basic',
    options: {

        validate: (request, username, password, h) => {

            return {
                isValid: true,
                credentials: username
            };
        }
    }
});
