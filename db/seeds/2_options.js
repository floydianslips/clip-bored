
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('options').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('options').insert({polls_id: 1, title: 'Yes?', description: 'Bacon is fantastic and should be consumed by everyone', points: 123.9}),
        knex('options').insert({polls_id: 1, title: 'NO?', description: 'Bacon is trash and tastes like burnt feet (wrong answer by the way', points: 0}),
        knex('options').insert({polls_id: 2, title: 'Paris?', description: 'Waldo loves French Fries', points: 32.5}),
        knex('options').insert({polls_id: 2, title: 'Berlin?', description: 'Waldo is into techno', points: 23.6}),
        knex('options').insert({polls_id: 2, title: 'Drunk Tank?', description: 'Waldo got arrested in a drunken stupor', points: 102}),
        knex('options').insert({polls_id: 2, title: 'Somewhere in the Saharan Desert?', description: 'He got lost following a group of bedouins', points: 53.7}),
        knex('options').insert({polls_id: 2, title: 'Australia?', description: "Waldo grew up as a joey in his mother's pouch", points: 0}),
        knex('options').insert({polls_id: 3, title: 'Market on Yates?', description: 'I left them while shopping', points: .7}),
        knex('options').insert({polls_id: 3, title: 'Middle of the ocean?', description: 'I lost them while swimming across the Pacific Ocean to Hawaii', points: 24}),
        knex('options').insert({polls_id: 3, title: 'YMCA?', description: 'They fell off playing professional table tennis', points: 3987.56}),
      ]);
    });
};
