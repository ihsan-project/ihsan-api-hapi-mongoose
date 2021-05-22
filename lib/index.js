'use strict';

const HauteCouture = require('haute-couture');
const Package = require('../package.json');
const Mongoose = require('mongoose');

exports.plugin = {
    pkg: Package,
    register: async (server, options) => {

        // Custom plugin code can go here
        server.app.connection = Mongoose.createConnection(process.env.MONGO_CONNECTION_STRING);

        await HauteCouture.using()(server, options);
    }
};
