'use strict';

const Schmervice = require('schmervice');

const internals = {};

module.exports = class SettingsService extends Schmervice.Service {
    settingsforUser(user, version, transaction) {

        const { bookType, currentVersion } = internals;

        if (version >= currentVersion) {
            return null;
        }

        return {
            version: currentVersion,
            bookType
        };
    }
};

internals.currentVersion = 1;

internals.bookType = {
    quran: 1
};
