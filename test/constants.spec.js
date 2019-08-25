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

    it('get constants.', async () => {

        const constants = await server.inject({
            method: 'get',
            url: '/constants'
        });

        expect(constants.statusCode).to.equal(200);
        // expect(constants.result[0].slugId).to.equal('book-quran');
    });
});
