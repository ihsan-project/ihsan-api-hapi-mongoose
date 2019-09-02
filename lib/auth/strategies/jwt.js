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
        validate: async (decoded, request) => {

            const { userService } = request.services();

            // TODO: respect the expiration set on jwt
            try {
                return {
                    isValid: true,
                    credentials: await userService.findUserById(decoded.id)
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
