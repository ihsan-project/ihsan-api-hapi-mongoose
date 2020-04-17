'use strict';

exports.up = function (knex, Promise) {

    return knex.schema.createTable('users', (table) => {

        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name');
        table.string('email').notNullable().unique(); // Need to index this
        table.string('access').unique(); // Need to index this
    }).createTable('user_authorizations', (table) => {

        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id');
        table.string('uuid').notNullable().unique();
        table.string('email').notNullable();
        table.integer('platform').unsigned().notNullable();
    }).createTable('user_statistics', (table) => {

        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable(); // Need to index this
        table.foreign('user_id').references('users.id');
        table.integer('intentions_created').unsigned().notNullable().defaultTo(0);
        table.integer('intentions_finished').unsigned().notNullable().defaultTo(0);
        table.integer('intentions_aborted').unsigned().notNullable().defaultTo(0);
        table.integer('challenges_contributed').unsigned().notNullable().defaultTo(0);
        table.integer('challenges_moderated').unsigned().notNullable().defaultTo(0);
    }).table('users', (table) => {

        table.integer('statistics_id').unsigned();
        table.foreign('statistics_id').references('user_statistics.id');
    }).createTable('user_push_tokens', (table) => {

        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable(); // Need to index this
        table.foreign('user_id').references('users.id');
        table.string('token').notNullable();
        table.string('platform').notNullable(); // Need to index this
        table.datetime('created_at');
        table.datetime('expires_at');
    }).createTable('books', (table) => {

        table.increments('id').primary();
        table.string('slug_id').notNullable();
        table.integer('type').unsigned().notNullable();
        table.string('title').notNullable();
    }).createTable('challenges', (table) => {

        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable(); // Need to index this
        table.foreign('user_id').references('users.id');
        table.integer('book_id').unsigned().notNullable();
        table.foreign('book_id').references('books.id'); // Need to index this
        table.integer('total_parts').notNullable();
        table.datetime('complete_at');
    }).createTable('challenge_states', (table) => {

        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id');
        table.integer('challenge_id').unsigned().notNullable();
        table.foreign('challenge_id').references('challenges.id');
        table.string('state').notNullable();
        table.datetime('created_at');
    }).table('challenges', (table) => {

        table.integer('current_state_id').unsigned();
        table.foreign('current_state_id').references('challenge_states.id');
    }).createTable('intentions', (table) => {

        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id');
        table.integer('challenge_id').unsigned().notNullable();
        table.foreign('challenge_id').references('challenges.id');
        table.integer('parts').notNullable();
        table.datetime('created_at');
    }).createTable('intention_states', (table) => {

        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id');
        table.integer('intention_id').unsigned().notNullable();
        table.foreign('intention_id').references('intentions.id');
        table.string('state').notNullable();
        table.datetime('created_at');
    }).table('intentions', (table) => {

        table.integer('current_state_id').unsigned();
        table.foreign('current_state_id').references('intention_states.id');
    });
};

exports.down = function (knex, Promise) {

    return knex.schema
        .dropTable('users')
        .dropTable('user_statistics')
        .dropTable('user_authorizations')
        .dropTable('user_push_tokens')
        .dropTable('books')
        .dropTable('challenges')
        .dropTable('challenge_states')
        .dropTable('intentions')
        .dropTable('intention_states');
};
