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

describe('Books', () => {

    it('get the quran.', async () => {

        const books = await server.inject({
            method: 'get',
            url: '/books'
        });

        expect(books.statusCode).to.equal(200);
    });
});
