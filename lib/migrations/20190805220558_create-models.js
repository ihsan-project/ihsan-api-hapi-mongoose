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
    }).createTable('Books', (table) => {

        table.increments('id').primary();
        table.string('slugId').notNullable();
        table.string('type').notNullable();
        table.string('title').notNullable();
    }).createTable('Challenges', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('Users.id');
        table.integer('bookId').unsigned().notNullable().references('Users.id');
        table.integer('currentStateId').unsigned().notNullable().references('Users.id');
        table.integer('totalParts').unsigned().notNullable();
        table.datetime('completeAt');
    }).createTable('ChallengeStates', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('Users.id');
        table.integer('challengeId').unsigned().notNullable().references('Users.id');
        table.string('state').notNullable();
        table.datetime('createdAt');
    }).createTable('Intentions', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('Users.id');
        table.integer('challengeId').unsigned().notNullable().references('Users.id');
        table.integer('currentStateId').unsigned().notNullable().references('Users.id');
        table.integer('parts').unsigned().notNullable();
        table.datetime('createdAt');
    }).createTable('ChallengeStates', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('Users.id');
        table.integer('intentionId').unsigned().notNullable().references('Users.id');
        table.string('state').notNullable();
        table.datetime('createdAt');
    });
};

exports.down = function (knex, Promise) {

    return knex.schema
        .dropTable('Users ')
        .dropTable('UserStatistics')
        .dropTable('UserSessions')
        .dropTable('UserPushTokens')
        .dropTable('Books');
};
