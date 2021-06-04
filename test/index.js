/* global server */
'use strict';

// The exports in this file needs to be at the top level of tests in folder structure,
// no siblings or the following export might not be loaded up in time

// Load modules

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Server = require('../server');
const Package = require('../package.json');
const KnexCleaner = require('knex-cleaner');

// Test shortcuts

const { describe, it, before, beforeEach } = exports.lab = Lab.script();
const { expect } = Code;

before(async () => {

    global.server = await Server.deployment();
});

beforeEach(async () => {

    // This ensures that each test starts from the same starting point
    // Use befores and beforeEach along with describe's to setup the Db for the test
    let knex = require('knex')({
        client: 'pg',
        connection: `${process.env.PG_CONNECTION_STRING}-test`
    });

    if (process.env.NODE_ENV === 'ci') {
        knex = require('knex')({
            client: 'pg',
            connection: {
                host: process.env.POSTGRES_HOST,
                port: process.env.POSTGRES_PORT,
                user: 'postgres',
                password: 'postgres',
                database: 'postgres'
            }
        });
    }

    await KnexCleaner.clean(knex);
    await knex.seed.run();
});

describe('Deployment', () => {

    it('registers the main plugin.', () => {

        expect(server.registrations[Package.name]).to.exist();
    });
});


exports.authenticate = async () => {

    const session = await server.inject({
        method: 'post',
        url: '/api/authorizations',
        payload: {
            uuid: 'test-uuid',
            digest: 'digest',
            email: 'x@y.com',
            first_name: 'test',
            platform: -1
        },
        headers: {
            'x-api-key': process.env.API_KEY
        }
    });

    global.user = session.result;
    global.headers =  {
        authorization: session.result.access,
        'x-api-key': process.env.API_KEY
    };
};
