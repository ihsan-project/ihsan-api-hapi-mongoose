
exports.up = function(knex, Promise) {
    return knex.schema.createTable('User', (table) => {

        table.increments('id').primary();
        table.string('firstName').notNullable();
        table.string('lastName');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('User');
};
