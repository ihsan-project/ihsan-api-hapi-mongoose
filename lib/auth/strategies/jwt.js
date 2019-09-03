'use strict';

const Bounce = require('@hapi/bounce');
const { NotFoundError } = require('objection');

module.exports = (server, options) => ({
    scheme: 'jwt',
    options: {
        key: options.jwt_secret_key,
        urlKey: false,
        cookieKey: false,
        tokenType: 'Token',
        verifyOptions: { algorithms: ['HS256'] },
        validate: (decoded, request) => {

            try {
                return {
                    isValid: true,
                    credentials: { uid: decoded.id }
                };
            }
            catch (error) {
                Bounce.ignore(error, NotFoundError);
                return {
                    isValid: false
                };
            }
        }
    }
});
