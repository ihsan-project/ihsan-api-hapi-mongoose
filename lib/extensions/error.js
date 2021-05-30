'use strict';

const Boom = require('@hapi/boom');
const Toys = require('@hapipal/toys');

const internals = {};

module.exports = Toys.onPreResponse((request, h) => {

    const { response: error } = request;
    const { mapError } = internals;

    if (!error.isBoom) {
        return h.continue;
    }

    throw mapError(error);
});

internals.mapError = (error) => {

    // Hide internal server errors from MongoDb queries
    if (error.output.statusCode >= 500) {
        return Boom.notFound(error);
    }

    return error;
};
