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

    it('get settings without version.', async () => {

        const settings = await server.inject({
            method: 'get',
            url: '/settings'
        });

        expect(settings.statusCode).to.equal(200);
        expect(settings.result.bookType.quran).to.equal(Constants.bookType.quran);
    });

    it('get settings with version.', async () => {

        const settings = await server.inject({
            method: 'get',
            url: '/settings'
        });

        expect(settings.statusCode).to.equal(200);

        const settingsAgain = await server.inject({
            method: 'get',
            url: `/settings/${settings.result.version}`
        });

        expect(settingsAgain.statusCode).to.equal(204);

        const settingsAhead = await server.inject({
            method: 'get',
            url: `/settings/${settings.result.version + 1}`
        });

        expect(settingsAhead.statusCode).to.equal(204);
    });
});
