/* global server access */
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
        url: '/api/authorizations',
        payload: {
            uuid: 'test-uuid',
            digest: 'digest',
            email: 'x@y.com',
            first_name: 'test',
            platform: -1
        },
        headers: {
            'x-api-key': process.env.API_KEY
        }
    });

    global.access = session.result.access;
});

describe('Books', () => {

    it('defaults to 5 books without page information', async () => {
        // The default limit is set in the manifest for hapi-pagination

        const books = await server.inject({
            method: 'get',
            url: '/api/books',
            headers: {
                authorization: access,
                'x-api-key': process.env.API_KEY
            }
        });

        expect(books.statusCode).to.equal(200);

        expect(books.result.meta.totalCount).to.equal(11);
        expect(books.result.results.length).to.equal(5);

        expect(books.result.results[0].slug_id).to.equal('book-quran');
        expect(books.result.results[0].type).to.equal(Constants.book_type.quran);

        expect(books.result.results[4].type).to.equal(Constants.book_type.zikr);
    });

    it('paginates through books properly', async () => {

        const books = await server.inject({
            method: 'get',
            url: '/api/books?page=2&limit=3',
            headers: {
                authorization: access,
                'x-api-key': process.env.API_KEY
            }
        });

        expect(books.statusCode).to.equal(200);

        expect(books.result.results.length).to.equal(3);

        expect(books.result.meta.count).to.equal(3);
        expect(books.result.meta.totalCount).to.equal(11);
        expect(books.result.meta.pageCount).to.equal(4);

        expect(books.result.results[0].slug_id).to.equal('book-zikr-surah-ikhlas');
        expect(books.result.results[0].type).to.equal(Constants.book_type.zikr);

        expect(books.result.results[2].slug_id).to.equal('book-zikr-alhamdu');
        expect(books.result.results[2].type).to.equal(Constants.book_type.zikr);
    });
});
