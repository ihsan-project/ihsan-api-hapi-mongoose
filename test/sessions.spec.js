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
            url: '/authentications',
            payload: {
                uuid: 'test-uuid',
                email,
                first_name: 'test',
                platform: Constants.authPlatform.google
            }
        });

        expect(session.statusCode).to.equal(200);
        expect(session.result.user.email).to.equal(email);
        expect(session.result.jwt).to.exist();

        // Getting session with different sso service, but same email returns same user
        const sameSession = await server.inject({
            method: 'post',
            url: '/authentications',
            payload: {
                uuid: 'different-test-uuid',
                email,
                first_name: 'different name',
                platform: Constants.authPlatform.apple
            }
        });

        expect(sameSession.statusCode).to.equal(200);
        expect(sameSession.result.user.email).to.equal(email);
        expect(sameSession.result.jwt).to.exist();
    });
});
