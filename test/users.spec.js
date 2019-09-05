/* global server user access */
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

    global.user = session.result;
    global.access = session.result.access;
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
                authorization: access
            }
        });

        expect(getUser.statusCode).to.equal(200);
    });

    it('get logged in user.', async () => {

        const getUser = await server.inject({
            method: 'get',
            url: `/users`,
            headers: {
                authorization: access
            }
        });

        expect(getUser.statusCode).to.equal(200);
        expect(getUser.result.id).to.equal(user.id);
    });

    it('get invalid user.', async () => {

        const getUser = await server.inject({
            method: 'get',
            url: `/users/${user.id + 99}`,
            headers: {
                authorization: access
            }
        });

        expect(getUser.statusCode).to.equal(404);
        expect(getUser.result.errors).to.exist();
    });
});
