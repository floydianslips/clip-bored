exports.up = function(knex, Promise) {
  return knex.schema.createTable('polls', function (table) {
    table.increments();
    table.string('options');
    table.string('maker');
    table.string('title');
    table.integer('voter_count');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('polls');
};
