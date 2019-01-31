exports.up = function(knex, Promise) {
  return knex.schema.createTable('makers', function (table) {
    table.increments();
    table.string('email');
    table.integer('polls_id');
    table.foreign('polls_id').references('polls.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('makers');
};