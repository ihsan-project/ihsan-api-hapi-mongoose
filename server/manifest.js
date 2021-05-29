'use strict';

const Dotenv = require('dotenv');
const Confidence = require('@hapipal/confidence');
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
                plugin: 'hapi-mongoose',
                options: {
                    $filter: { $env: 'NODE_ENV' },
                    $default: {
                        promises: 'native',
                        settings: {
                            poolSize: 10
                        },
                        decorate: true
                    },
                    $base: {
                        uri: process.env.MONGO_CONNECTION_STRING
                    },
                    test: {
                        uri: process.env.MONGO_CONNECTION_STRING_TEST
                    },
                    docker: {
                        uri: 'mongodb://host.docker.internal:27017/maktabah?replicaSet=rs'
                    }
                }
            },
            {
                plugin: '../lib', // Main plugin
                options: {

                },
                routes: {
                    prefix: '/api'
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
