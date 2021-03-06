'use strict';

const { Seeder } = require('mongo-seeding');

module.exports = {
    name: 'hapi-mongo-seeding',
    register: (server, options) => {

        // TODO: Need to find a better way to get the connecdtion string from the hapi-mongoose plugin
        const connectionString = server.plugins['hapi-mongoose'].connection._connectionString;

        const config = {
            database: connectionString
        };

        const seeder = new Seeder(config);

        server.expose('seeder', seeder);
    }
};
