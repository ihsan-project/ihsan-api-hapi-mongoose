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

// if (!module.parent) {

//     exports.deployment(true);

//     process.on('unhandledRejection', (err) => {

//         throw err;
//     });
// }

console.log("monkey");
const { Client } = require('pg');

// Works on local machine
// const pgclient = new Client({
//     host: 'localhost',
//     port: '5432',
//     user: '',
//     password: '',
//     database: 'ihsan-dev'
// });

const pgclient = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
});

pgclient.connect();

pgclient.query('SELECT NOW()', (err, res) => {
    if (err) throw err
    console.log(res)
    pgclient.end()
});

// pgclient.query('SELECT * FROM student', (err, res) => {
//     if (err) throw err
//     console.log(err, res.rows) // Print the data in student table
//     pgclient.end()
// });