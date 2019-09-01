/* global server */
'use strict';

// Load modules

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Server = require('../server');

const Constants = require('../lib/constants');

// Test shortcuts

const { describe, it, before } = exports.lab = Lab.script();
const { expect } = Code;

before(async () => {

    global.server = await Server.deployment();
});

describe('Sessions', () => {

    it('get jwt from SSO.', async () => {

        const email = 'x@y.com';
        const session = await server.inject({
            method: 'post',
            url: '/sessions',
            payload: {
                uuid: 'test-uuid',
                email,
                firstName: 'test',
                platform: Constants.authPlatform.google
            }
        });

        expect(session.statusCode).to.equal(200);
        expect(session.result.user.email).to.equal(email);
        expect(session.result.jwt).to.exist();
    });
});
