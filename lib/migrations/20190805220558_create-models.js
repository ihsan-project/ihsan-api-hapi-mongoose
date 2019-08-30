'use strict';

exports.up = function (knex, Promise) {

    return knex.schema.createTable('Users', (table) => {

        table.increments('id').primary();
        table.string('firstName').notNullable();
        table.string('lastName');
        table.string('email').notNullable().unique();
    }).createTable('UserAuthentication', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('Users.id');
        table.string('uuid').notNullable().unique();
        table.string('email').notNullable().unique();
        table.integer('platform').unsigned().notNullable();
    }).createTable('UserSessions', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('Users.id');
        table.integer('authId').unsigned().notNullable().references('UserAuthentication.id');
        table.string('token').notNullable().unique();
        table.datetime('createdAt');
        table.datetime('expiresAt');
    }).createTable('UserStatistics', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('Users.id');
        table.integer('intentionsCreated').unsigned().notNullable().defaultTo(0);
        table.integer('intentionsFinished').unsigned().notNullable().defaultTo(0);
        table.integer('intentionsAborted').unsigned().notNullable().defaultTo(0);
        table.integer('challengesContributed').unsigned().notNullable().defaultTo(0);
        table.integer('challengesModerated').unsigned().notNullable().defaultTo(0);
    }).table('Users', (table) => {

        table.integer('statisticsId').unsigned().notNullable().references('UserStatistics.id');
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
        table.integer('type').unsigned().notNullable();
        table.string('title').notNullable();
    }).createTable('Challenges', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('Users.id');
        table.integer('bookId').unsigned().notNullable().references('Books.id');
        table.integer('totalParts').notNullable();
        table.datetime('completeAt');
    }).createTable('ChallengeStates', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('Users.id');
        table.integer('challengeId').unsigned().notNullable().references('Challenges.id');
        table.string('state').notNullable();
        table.datetime('createdAt');
    }).table('Challenges', (table) => {

        table.integer('currentStateId').unsigned().notNullable().references('ChallengeStates.id');
    }).createTable('Intentions', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('Users.id');
        table.integer('challengeId').unsigned().notNullable().references('Challenges.id');
        table.integer('parts').notNullable();
        table.datetime('createdAt');
    }).createTable('IntentionStates', (table) => {

        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('Users.id');
        table.integer('intentionId').unsigned().notNullable().references('Intentions.id');
        table.string('state').notNullable();
        table.datetime('createdAt');
    }).table('Intentions', (table) => {

        table.integer('currentStateId').unsigned().notNullable().references('IntentionStates.id');
    });
};

exports.down = function (knex, Promise) {

    return knex.schema
        .dropTable('Users ')
        .dropTable('UserStatistics')
        .dropTable('UserSessions')
        .dropTable('UserPushTokens')
        .dropTable('Books')
        .dropTable('Challenges')
        .dropTable('ChallengeStates')
        .dropTable('Intentions')
        .dropTable('IntentionStates');
};
