'use strict';

const Glue = require('@hapi/glue');
const Manifest = require('../server/manifest');


const getServer = async () => {

    const manifest = Manifest.get('/');
    const server = await Glue.compose(manifest, { relativeTo: __dirname });

    await server.initialize();

    await server.start();

    return server;
};

module.exports = { getServer };
