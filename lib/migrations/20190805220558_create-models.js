'use strict';

exports.up = function (knex, Promise) {

    return knex.schema.createTable('User', (table) => {

        table.increments('id').primary();
        table.string('firstName').notNullable();
        table.string('lastName');
    }).createTable('UserStatistics', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('User.id');
    });
};

exports.down = function (knex, Promise) {

    return knex.schema
        .dropTable('User')
        .dropTable('UserStatistics');
};
