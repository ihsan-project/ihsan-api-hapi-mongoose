/* global server */
'use strict';

// Load modules

const Code = require('@hapi/code');
const TestBase = require('..');

// Test shortcuts

const { describe, it } = TestBase.lab;
const { expect } = Code;


describe('Create Authorizations', () => {

    it('fails without api key.', async () => {

        const email = 'x@y.com';
        const session = await server.inject({
            method: 'post',
            url: '/api/authorizations',
            payload: {
                uuid: 'test-uuid',
                digest: 'digest',
                email,
                first_name: 'test',
                platform: -1
            }
        });

        expect(session.statusCode).to.equal(401);
        expect(session.result.errors.error).to.only.contain('invalid key');
    });

    it('returns user after successful authorization.', async () => {

        const email = 'x@y.com';
        const session = await server.inject({
            method: 'post',
            url: '/api/authorizations',
            payload: {
                uuid: 'test-uuid',
                digest: 'digest',
                email,
                first_name: 'test',
                platform: -1
            },
            headers: {
                'x-api-key': process.env.API_KEY
            }
        });

        expect(session.statusCode).to.equal(200);
        expect(session.result.email).to.equal(email);
        expect(session.result.access).to.exist();

        // Check that post user create hooks ran
        const user = await server.models().User.query().findById(session.result.id);
        expect(user).to.exist();
        expect(await user.$relatedQuery('statistics')).to.exist();

        const access = session.result.access;

        // Getting session with different sso service, but same email returns same user
        const sameSession = await server.inject({
            method: 'post',
            url: '/api/authorizations',
            payload: {
                uuid: 'different-test-uuid',
                digest: 'digest',
                email,
                first_name: 'different name',
                platform: -2
            },
            headers: {
                'x-api-key': process.env.API_KEY
            }
        });

        expect(sameSession.statusCode).to.equal(200);
        expect(sameSession.result.email).to.equal(email);
        expect(sameSession.result.access).to.equal(access);
    });
});
