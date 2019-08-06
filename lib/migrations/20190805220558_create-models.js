'use strict';

exports.up = function (knex, Promise) {

    return knex.schema.createTable('Users', (table) => {

        table.increments('id').primary();
        table.string('firstName').notNullable();
        table.string('lastName');
    }).createTable('UserStatistics', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('Users.id');
        table.integer('intentionsCreated').unsigned().notNullable();
        table.integer('intentionsFinished').unsigned().notNullable();
        table.integer('intentionsAborted').unsigned().notNullable();
        table.integer('challengesContributed').unsigned().notNullable();
        table.integer('challengesModerated').unsigned().notNullable();
    }).createTable('UserSessions', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('Users.id');
        table.string('token').notNullable();
        table.string('platform').notNullable();
        table.datetime('createdAt');
        table.datetime('expiresAt');
    }).createTable('UserPushTokens', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('Users.id');
        table.string('token').notNullable();
        table.string('platform').notNullable();
        table.datetime('createdAt');
        table.datetime('expiresAt');
    });
};

exports.down = function (knex, Promise) {

    return knex.schema
        .dropTable('Users ')
        .dropTable('UserStatistics')
        .dropTable('UserSessions')
        .dropTable('UserPushTokens');
};
