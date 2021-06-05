'use strict';

const Glue = require('@hapi/glue');
const Manifest = require('./manifest');

exports.deployment = async (start) => {

    const manifest = Manifest.get('/');
    const server = await Glue.compose(manifest, { relativeTo: __dirname });

    await server.initialize();

    if (!start) {
        return server;
    }

    await server.start();

    console.log(`Server started at ${server.info.uri}`);

    return server;
};

if (!module.parent) {

    exports.deployment(true);

    process.on('unhandledRejection', (err) => {

        throw err;
    });
}

// console.log("monkey");
// const { Client } = require('pg');

// // Works on local machine
// // const pgclient = new Client({
// //     host: process.env.PG_CONNECTION_STRING,
// //     user: process.env.PG_CONNECTION_USER,
// //     password: process.env.PG_CONNECTION_PASSWORD,
// //     database: process.env.PG_CONNECTION_DB_NAME
// // });

// const pgclient = new Client({
//     host: process.env.POSTGRES_HOST,
//     // port: process.env.POSTGRES_PORT,
//     user: 'postgres',
//     password: 'postgres',
//     database: 'postgres'
// });

// pgclient.connect();

// pgclient.query('SELECT NOW()', (err, res) => {
//     if (err) throw err
//     console.log(res)
//     pgclient.end()
// });