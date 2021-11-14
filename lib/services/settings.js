'use strict';

const Schmervice = require('@hapipal/schmervice');
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
            constants: {
                book_type: Constants.book_type,
                auth_platform: Constants.auth_platform
            },
            features: {
                // These can be Feature Flags to enable/disable parts of the client apps
            }
        };
    }
};
