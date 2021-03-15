'use strict';

const Faker = require('faker');

module.exports.loadFakeUser = async (server) => {

    const User = server.models().User;

    return await User.query().insert({
        first_name: Faker.name.firstName(),
        email: Faker.internet.email(),
        created_at: new Date()
    });
};
