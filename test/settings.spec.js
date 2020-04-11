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

describe('Settings', () => {

    it('keyless api call.', async () => {

        const settings = await server.inject({
            method: 'get',
            url: '/api/settings'
        });

        expect(settings.statusCode).to.equal(401);
        expect(settings.result.errors.unauthorized).to.only.contain('invalid key');
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
        expect(settings.result.bookType.quran).to.equal(Constants.bookType.quran);
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
