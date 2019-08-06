'use strict';

exports.up = function (knex, Promise) {

    return knex.schema.createTable('User', (table) => {

        table.increments('id').primary();
        table.string('firstName').notNullable();
        table.string('lastName');
    }).createTable('UserStatistics', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('User.id');
        table.integer('intentionsCreated').unsigned().notNullable();
        table.integer('intentionsFinished').unsigned().notNullable();
        table.integer('intentionsAborted').unsigned().notNullable();
        table.integer('challengesContributed').unsigned().notNullable();
        table.integer('challengesModerated').unsigned().notNullable();
    });
};

exports.down = function (knex, Promise) {

    return knex.schema
        .dropTable('User')
        .dropTable('UserStatistics');
};
