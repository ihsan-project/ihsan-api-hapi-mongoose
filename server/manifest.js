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
                    jwt_secret_key : {
                        $filter: { $env: 'NODE_ENV' },
                        $default: {
                            $env: 'JWT_SECRET_KEY'
                        }
                    }
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
                            connection: process.env.PG_CONNECTION_STRING,
                            searchPath: ['knex', 'public']
                        }
                    },
                    test: {
                        knex: {
                            connection: `${process.env.PG_CONNECTION_STRING}-test`
                        }
                    },
                    development: {
                        knex: {
                            connection: `${process.env.PG_CONNECTION_STRING}-dev`
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
