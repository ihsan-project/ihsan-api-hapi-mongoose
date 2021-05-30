'use strict';

const { getServer } = require('./');
const Path = require('path');

/**
 * Make any changes you need to make to the database here
 */
const up = async () => {

    const server = await getServer();
    const seeder = server.plugins['hapi-mongo-seeding'].seeder;

    const collections = seeder.readCollectionsFromPath(Path.resolve('seeds'));

    return await seeder.import(collections);
};

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
const down = async () => {
    // Write migration here
};

module.exports = { up, down };
