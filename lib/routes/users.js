'use strict';

module.exports = {
    method: 'GET',
    path: '/users/{id}',
    options: {
        auth: 'jwt',
        // eslint-disable-next-line require-await
        handler: async (request, h) => {

            const { id } = request.params;
            const { User } = request.models();

            return await User.query().findById(id);
        }
    }
};
