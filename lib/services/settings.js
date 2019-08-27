'use strict';

const Schmervice = require('schmervice');
const Constants = require('../constants');

const internals = {
    // Increment this when changes are made to settings response
    currentVersion: 1
};

module.exports = class SettingsService extends Schmervice.Service {
    settingsforUser(user, version, transaction) {

        const { currentVersion } = internals;

        if (version >= currentVersion) {
            return null;
        }

        return {
            version: currentVersion,
            bookType: Constants.bookType
        };
    }
};
