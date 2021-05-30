const getServer = require('./');
const Path = require('path');

/**
 * Make any changes you need to make to the database here
 */
async function up () {

  const server = await getServer();
  const seeder = server.plugins['hapi-mongo-seeding'].seeder;

  const collections = seeder.readCollectionsFromPath(Path.resolve("seeds"));

  return await seeder.import(collections);
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
}

module.exports = { up, down };
