
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('makers').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('makers').insert({polls_id: 1,email: 'sammy@sammy.com'}),
        knex('makers').insert({polls_id: 2, email: 'ghabe@ghabe.com'}),
        knex('makers').insert({polls_id: 3, email: 'josh@josh.com'})
      ]);
    });
};
