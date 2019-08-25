'use strict';

const Schmervice = require('schmervice');

const internals = {};

module.exports = class ConstantsService extends Schmervice.Service {
    settingsforUser(user, transaction) {

        const { booksKey } = internals;

        return {
            booksKey: booksKey()
        };
    }
};

internals.booksKey = () => {

    return {
        quran: 1
    };
};
