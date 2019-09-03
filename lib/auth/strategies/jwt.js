'use strict';

module.exports = (server, options) => ({
    scheme: 'jwt',
    options: {
        key: options.jwt_secret_key,
        urlKey: false,
        cookieKey: false,
        tokenType: 'Token',
        verifyOptions: { algorithms: ['HS256'] },
        validate: (decoded, request) => {

            const { userService } = request.services();

            if (userService.validateToken(decoded)) {
                return {
                    isValid: true,
                    credentials: decoded
                };
            }

            return {
                isValid: false
            };
        }
    }
});
