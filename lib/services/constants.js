'use strict';

const Schmervice = require('schmervice');

const internals = {};

module.exports = class ConstantsService extends Schmervice.Service {
    settingsforUser(user, version, transaction) {

        const { booksKey, currentVersion } = internals;

        if (version >= currentVersion) {
            return null;
        }

        return {
            version: currentVersion,
            booksKey
        };
    }
};

internals.currentVersion = 1;

internals.booksKey = {
    quran: 1
};
