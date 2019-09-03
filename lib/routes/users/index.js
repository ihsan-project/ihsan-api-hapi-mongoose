'use strict';

module.exports = {
    method: 'GET',
    path: '/users',
    options: {
        auth: 'jwt',
        // eslint-disable-next-line require-await
        handler: async (request, h) => {

            const { credentials: { uid } } = request.auth;
            const { User } = request.models();

            return await User.query().findById(uid);
        }
    }
};
