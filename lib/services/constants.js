'use strict';

const Schmervice = require('schmervice');

module.exports = class ServiceName extends Schmervice.Service {
    settingsforUser(user, transaction) {

        return {
            books: {
                1: 'quoran'
            }
        };
    }
};
