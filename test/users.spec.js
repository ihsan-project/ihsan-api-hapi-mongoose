/* global server user jwt */
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

    const session = await server.inject({
        method: 'post',
        url: '/authentications',
        payload: {
            uuid: 'test-uuid',
            email: 'x@y.com',
            first_name: 'test',
            platform: Constants.authPlatform.google
        }
    });

    global.user = session.result.user;
    global.jwt = session.result.jwt;
});

describe('Users', () => {

    it('unauthorized api call.', async () => {

        const getUser = await server.inject({
            method: 'get',
            url: `/users/${user.id}`
        });

        expect(getUser.statusCode).to.equal(401);
    });

    it('get user.', async () => {

        const getUser = await server.inject({
            method: 'get',
            url: `/users/${user.id}`,
            headers: {
                authorization: `Token ${jwt}`
            }
        });

        expect(getUser.statusCode).to.equal(200);
    });
});
