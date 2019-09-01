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

    it('get session from SSO.', async () => {

        const settings = await server.inject({
            method: 'post',
            url: '/sessions',
            payload: {
                uuid: 'test-uuid',
                email: 'x@y.com',
                firstName: 'test',
                platform: 1
            }
        });

        expect(settings.statusCode).to.equal(200);
    });
});
