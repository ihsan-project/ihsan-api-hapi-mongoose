/* global server user headers */
'use strict';

// Load modules

const Code = require('@hapi/code');
const TestBase = require('..');

// Test shortcuts

const { authenticate, lab: { it, before, describe } } = TestBase;
const { expect } = Code;


describe('Users', () => {

    before(() => {

        authenticate();
    });

    it('authless api call.', async () => {

        const getUser = await server.inject({
            method: 'get',
            url: `/api/users/${user.id}`
        });

        expect(getUser.statusCode).to.equal(401);
        expect(getUser.result.errors.error).to.only.contain('invalid key');
    });

    it('unauthorized api call.', async () => {

        const getUser = await server.inject({
            method: 'get',
            url: `/api/users/${user.id}`,
            headers: {
                'x-api-key': process.env.API_KEY
            }
        });

        expect(getUser.statusCode).to.equal(401);
        expect(getUser.result.errors.error).to.only.contain('invalid access');
    });

    it('key-less authorized api call.', async () => {

        const getUser = await server.inject({
            method: 'get',
            url: `/api/users/${user.id}`,
            headers: {
                authorization: headers.authorization
            }
        });

        expect(getUser.statusCode).to.equal(401);
        expect(getUser.result.errors.error).to.only.contain('invalid key');
    });

    it('get profile.', async () => {

        const getUser = await server.inject({
            method: 'get',
            url: `/api/users/profile`,
            headers: {
                authorization: headers.authorization,
                'x-api-key': process.env.API_KEY
            }
        });

        expect(getUser.statusCode).to.equal(200);
        expect(getUser.result.email).to.equal(user.email);
    });

    it('get user.', async () => {

        const getUser = await server.inject({
            method: 'get',
            url: `/api/users/${user.id}`,
            headers: {
                authorization: headers.authorization,
                'x-api-key': process.env.API_KEY
            }
        });

        expect(getUser.statusCode).to.equal(200);
    });

    it('get invalid user.', async () => {

        const getUser = await server.inject({
            method: 'get',
            url: `/api/users/${user.id + 99}`,
            headers: {
                authorization: headers.authorization,
                'x-api-key': process.env.API_KEY
            }
        });

        expect(getUser.statusCode).to.equal(404);
        expect(getUser.result.errors).to.exist();
    });
});
