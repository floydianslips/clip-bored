exports.up = function(knex, Promise) {
  return knex.schema.createTable('options', function (table) {
    table.increments();
    table.integer('polls_id');
    table.foreign('polls_id').references('polls.id');
    table.string('description');
    table.string('title');
    table.decimal('points');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('options');
};