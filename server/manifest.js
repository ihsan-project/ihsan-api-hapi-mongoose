'use strict';

const Dotenv = require('dotenv');
const Confidence = require('confidence');
const Toys = require('toys');

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
                plugin: 'hapi-mongodb',
                options: {
                    $filter: { $env: 'NODE_ENV' },
                    $default: {},
                    $base: {
                        url: process.env.PG_CONNECTION_STRING,
                    },
                    test: {
                        url: `${process.env.PG_CONNECTION_STRING}-test`,
                    },
                    docker: {
                        url: 'mongodb://host.docker.internal:27017/maktabah'
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
                    $default: 'hpal-debug',
                    staging: Toys.noop,
                    production: Toys.noop
                }
            }
        ]
    }
});
