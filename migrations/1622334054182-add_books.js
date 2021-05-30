const getServer = require('./');

/**
 * Make any changes you need to make to the database here
 */
async function up () {

  const server = await getServer();
  console.log("mmi: server", server);

  throw new Error('TESTING ERROR!!!');
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
}

module.exports = { up, down };
