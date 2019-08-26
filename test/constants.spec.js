/* global server */
'use strict';

// Load modules

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Server = require('../server');

// Test shortcuts

const { describe, it, before } = exports.lab = Lab.script();
const { expect } = Code;

before(async () => {

    global.server = await Server.deployment();
});

describe('Constants', () => {

    it('get constants without version.', async () => {

        const constants = await server.inject({
            method: 'get',
            url: '/constants'
        });

        expect(constants.statusCode).to.equal(200);
        expect(constants.result.booksKey.quran).to.equal(1);
    });

    it('get constants with version.', async () => {

        const constants = await server.inject({
            method: 'get',
            url: '/constants'
        });

        expect(constants.statusCode).to.equal(200);

        const constantsAgain = await server.inject({
            method: 'get',
            url: `/constants/${constants.result.version}`
        });

        expect(constantsAgain.statusCode).to.equal(204);

        const constantsAhead = await server.inject({
            method: 'get',
            url: `/constants/${constants.result.version + 1}`
        });

        expect(constantsAhead.statusCode).to.equal(204);
    });
});
