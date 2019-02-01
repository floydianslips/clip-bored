$(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;

//Logic For When A User Submits A New Tweet In The Compose Tweet Box, Includes A Few Error Handlers With A Small Error Boxs That Pops Up
  // $('form').on('submit', function(event) {
  //   event.preventDefault();
  //   let lengthOfNewTweet = $('.new-tweet textarea').val().length;
  //   $('#err0r').slideUp();
  //   if (lengthOfNewTweet <= 140 && lengthOfNewTweet > 0) {
  //     $.ajax({
  //       method: 'POST',
  //       url: '/tweets/',
  //       data: $(this).serialize(),
  //     }).done(function() {
  //       $('.new-tweet textarea').val('');
  //       loadTweets();
  //     });
  //   } else if (lengthOfNewTweet === 0) {
  //       $('#err0r').text('Your Tweet Is Empty!');
  //       $('#err0r').slideDown();
  //   } else if (lengthOfNewTweet > 140) {
  //      $('#err0r').text('Your Tweet Is Too Long!');
  //      $('#err0r').slideDown();
  //   } else {
  //       alert(`You Shouldn't Be Seeing This`);
  //   }
  // });

$('form').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/polls/',
      data:
    })
});
});
