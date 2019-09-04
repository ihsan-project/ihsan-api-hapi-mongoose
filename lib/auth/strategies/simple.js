'use strict';

module.exports = (server, options) => ({
    scheme: 'basic',
    options: {

        validate: (request, username, password, h) => {

            console.log("mmi");
            return {
                isValid: true,
                credentials: {test: "monkey"}
            };
        }
    }
});
