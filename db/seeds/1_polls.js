
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('polls').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('polls').insert({options: 1, maker: 1, title: "Bacon?", voter_count: 0}),
        knex('polls').insert({options: 2, maker: 2, title: "Where's Waldo?", voter_count: 10}),
        knex('polls').insert({options: 3, maker: 3, title: "Where are my glasses?", voter_count: 102}),
      ]);
    });
};
