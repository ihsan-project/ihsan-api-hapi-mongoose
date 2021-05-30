'use strict';

const Glue = require('@hapi/glue');
const Manifest = require('../server/manifest');

/**
 * Make any changes you need to make to the database here
 */
 module.exports = async () => {
  const manifest = Manifest.get('/');
  const server = await Glue.compose(manifest, { relativeTo: __dirname });

  await server.initialize();

  await server.start();

  return server;
}
