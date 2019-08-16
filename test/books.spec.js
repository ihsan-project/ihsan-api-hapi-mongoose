'use strict';

// Load modules

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Server = require('../server');
const Package = require('../package.json');

// Test shortcuts

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('Books', () => {

    it('get the quran.', async () => {

        const server = await Server.deployment();

        const books = await server.inject({
            method: 'get',
            url: '/books'
        });

        expect(books.statusCode).to.equal(200);
        console.log(books.result);
    });
});
