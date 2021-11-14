/* global server */
'use strict';

// Load modules

const Code = require('@hapi/code');
const TestBase = require('..');

const Constants = require('../../lib/constants');

// Test shortcuts

const { describe, it } = TestBase.lab;
const { expect } = Code;


describe('Settings', () => {

    it('keyless api call.', async () => {

        const settings = await server.inject({
            method: 'get',
            url: '/api/settings'
        });

        expect(settings.statusCode).to.equal(401);
        expect(settings.result.errors.error).to.only.contain('invalid key');
    });

    it('without version.', async () => {

        const settings = await server.inject({
            method: 'get',
            url: '/api/settings',
            headers: {
                'x-api-key': process.env.API_KEY
            }
        });

        expect(settings.statusCode).to.equal(200);
        expect(settings.result.constants.book_type.quran).to.equal(Constants.book_type.quran);
    });

    it('with version.', async () => {

        const settings = await server.inject({
            method: 'get',
            url: '/api/settings',
            headers: {
                'x-api-key': process.env.API_KEY
            }
        });

        expect(settings.statusCode).to.equal(200);

        const settingsAgain = await server.inject({
            method: 'get',
            url: `/api/settings/${settings.result.version}`,
            headers: {
                'x-api-key': process.env.API_KEY
            }
        });

        expect(settingsAgain.statusCode).to.equal(204);

        const settingsAhead = await server.inject({
            method: 'get',
            url: `/api/settings/${settings.result.version + 1}`,
            headers: {
                'x-api-key': process.env.API_KEY
            }
        });

        expect(settingsAhead.statusCode).to.equal(204);
    });
});
