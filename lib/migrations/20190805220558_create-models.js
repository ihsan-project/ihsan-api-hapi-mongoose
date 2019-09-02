'use strict';

exports.up = function (knex, Promise) {

    return knex.schema.createTable('Users', (table) => {

        table.increments('id').primary();
        table.string('firstName').notNullable();
        table.string('lastName');
        table.string('email').notNullable().unique();
    }).createTable('UserAuthentications', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('Users.id');
        table.string('uuid').notNullable().unique();
        table.string('email').notNullable();
        table.integer('platform').unsigned().notNullable();
    }).createTable('UserStatistics', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('Users.id');
        table.integer('intentionsCreated').unsigned().notNullable().defaultTo(0);
        table.integer('intentionsFinished').unsigned().notNullable().defaultTo(0);
        table.integer('intentionsAborted').unsigned().notNullable().defaultTo(0);
        table.integer('challengesContributed').unsigned().notNullable().defaultTo(0);
        table.integer('challengesModerated').unsigned().notNullable().defaultTo(0);
    }).table('Users', (table) => {

        table.integer('statisticsId').unsigned().references('UserStatistics.id');
    }).createTable('UserPushTokens', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('Users.id');
        table.string('token').notNullable();
        table.string('platform').notNullable();
        table.datetime('createdAt');
        table.datetime('expiresAt');
    }).createTable('books', (table) => {

        table.increments('id').primary();
        table.string('slug_id').notNullable();
        table.integer('type').unsigned().notNullable();
        table.string('title').notNullable();
    }).createTable('challenges', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('Users.id');
        table.integer('bookId').unsigned().notNullable().references('books.id');
        table.integer('totalParts').notNullable();
        table.datetime('completeAt');
    }).createTable('challenge_states', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('Users.id');
        table.integer('challengeId').unsigned().notNullable().references('challenges.id');
        table.string('state').notNullable();
        table.datetime('createdAt');
    }).table('challenges', (table) => {

        table.integer('currentStateId').unsigned().notNullable().references('challenge_states.id');
    }).createTable('intentions', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('Users.id');
        table.integer('challengeId').unsigned().notNullable().references('challenges.id');
        table.integer('parts').notNullable();
        table.datetime('createdAt');
    }).createTable('intention_states', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('Users.id');
        table.integer('intentionId').unsigned().notNullable().references('intentions.id');
        table.string('state').notNullable();
        table.datetime('createdAt');
    }).table('intentions', (table) => {

        table.integer('currentStateId').unsigned().notNullable().references('intention_states.id');
    });
};

exports.down = function (knex, Promise) {

    return knex.schema
        .dropTable('Users ')
        .dropTable('UserStatistics')
        .dropTable('UserAuthentications')
        .dropTable('UserPushTokens')
        .dropTable('books')
        .dropTable('challenges')
        .dropTable('challenge_states')
        .dropTable('intentions')
        .dropTable('intention_states');
};
