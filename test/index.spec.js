'use strict';

// Load modules

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Server = require('../server');
const Package = require('../package.json');

// Test shortcuts

const { describe, it, before } = exports.lab = Lab.script();
const { expect } = Code;

// before(async (done) => {

//     const server = await Server.deployment();

//     server.database.on('connected', () => {

//         console.log('Connected!');
//         done();
//     });
// });

describe('Deployment', () => {

    it('registers the main plugin.', async () => {

        const server = await Server.deployment();

        expect(server.registrations[Package.name]).to.exist();
    });
});
