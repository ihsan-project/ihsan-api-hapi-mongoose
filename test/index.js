/* global server */
'use strict';

// The exports in this file needs to be at the top level of tests in folder structure,
// no siblings or the following export might not be loaded up in time

// Load modules

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Server = require('../server');
const Package = require('../package.json');

// Test shortcuts

const { describe, it, before, beforeEach } = exports.lab = Lab.script();
const { expect } = Code;

const internals = {
    runAuthentication: false
};


before(async () => {

    global.server = await Server.deployment();
});

beforeEach(async () => {

    // This ensures that each test starts from the same starting point
    // Use befores and beforeEach along with describe's to setup the Db for the test
    await server.plugins['hapi-mongoose'].connection.db.dropDatabase();
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
            firstName: 'test',
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
