'use strict';

const Dotenv = require('dotenv');
const Confidence = require('confidence');
const Toys = require('toys');

// Pull .env into process.env
Dotenv.config({ path: `${__dirname}/.env` });

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
    server: {
        host: 'localhost',
        port: {
            $env: 'PORT',
            $coerce: 'number',
            $default: 3000
        },
        debug: {
            $filter: { $env: 'NODE_ENV' },
            $default: {
                log: ['error'],
                request: ['error']
            },
            staging: {
                request: ['implementation']
            },
            production: {
                request: ['implementation']
            }
        }
    },
    register: {
        plugins: [
            {
                plugin: '../lib', // Main plugin
                options: {

                }
            },
            {
                plugin: 'schwifty',
                options: {
                    $filter: { $env: 'NODE_ENV' },
                    $default: {},
                    $base: {
                        knex: {
                            client: 'pg',
                            connection: {
                                host : process.env.PG_CONNECTION_STRING,
                                password : process.env.PG_CONNECTION_PASSWORD,
                                user: process.env.PG_CONNECTION_USER,
                                database: process.env.PG_CONNECTION_DB_NAME
                            },
                            searchPath: ['knex', 'public']
                        }
                    },
                    test: {
                        knex: {
                            connection: 'postgres://localhost:5432/khatm-test'
                        }
                    },
                    development: {
                        knex: {
                            connection: 'postgres://localhost:5432/khatm-dev'
                        }
                    },
                    staging: {
                        migrateOnStart: 'latest'
                    },
                    production: {
                        migrateOnStart: 'latest'
                    }
                }
            },
            {
                plugin: {
                    $filter: { $env: 'NODE_ENV' },
                    $default: 'hpal-debug',
                    staging: Toys.noop,
                    production: Toys.noop
                }
            }
        ]
    }
});
