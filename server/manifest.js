'use strict';

const Dotenv = require('dotenv');
const Confidence = require('confidence');
const Toys = require('@hapipal/toys');

// Pull .env into process.env
Dotenv.config({ path: `${__dirname}/.env` });

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
    server: {
        // host: 'localhost', This was causing it to not work with docker
        port: {
            $env: 'PORT',
            $coerce: 'number',
            $default: 8080
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

                },
                routes: {
                    prefix: '/api'
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
                                host: process.env.PG_CONNECTION_STRING,
                                password: process.env.PG_CONNECTION_PASSWORD,
                                user: process.env.PG_CONNECTION_USER,
                                database: process.env.PG_CONNECTION_DB_NAME
                            },
                            searchPath: ['knex', 'public']
                        }
                    },
                    test: {
                        knex: {
                            connection: 'postgres://localhost:5432/ihsan-test'
                        }
                    },
                    development: {
                        knex: {
                            connection: 'postgres://localhost:5432/ihsan-dev'
                        }
                    },
                    staging: {
                        migrateOnStart: 'latest'
                    },
                    production: {
                        migrateOnStart: 'latest'
                    },
                    docker: {
                        knex: {
                            // To connect to a local instance of postgres during development
                            connection: 'postgres://host.docker.internal:5432/ihsan-dev'
                        }
                    }
                }
            },
            {
                plugin: 'hapi-pagination',
                options: {
                    query: {
                        limit: {
                            default: 5
                        }
                    },
                    routes: {
                        include: []
                    }
                }
            },
            {
                plugin: {
                    $filter: { $env: 'NODE_ENV' },
                    $default: '@hapipal/hpal-debug',
                    staging: Toys.noop,
                    production: Toys.noop
                }
            }
        ]
    }
});
