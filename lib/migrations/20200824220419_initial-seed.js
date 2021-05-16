'use strict';

exports.up = async function (knex) {

    await knex.seed.run();
};

exports.down = function (knex, Promise) {

};
