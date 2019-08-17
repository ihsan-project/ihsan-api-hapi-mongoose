/* global server */
'use strict';

// Load modules

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Server = require('../server');
const Package = require('../package.json');

// Test shortcuts

const { describe, it, before } = exports.lab = Lab.script();
const { expect } = Code;

before(async () => {

    global.server = await Server.deployment();
});

describe('Deployment', () => {

    it('registers the main plugin.', () => {

        expect(server.registrations[Package.name]).to.exist();
    });
});
