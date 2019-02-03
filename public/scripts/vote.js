$(() => {
const url = window.location.href;
const result = /[^/]*$/.exec(url)[0];
let currentTitle = "";

  $.ajax({
    method: "GET",
    url: `/api/polls/${result}`
  }).done((options) => {
    let howManyCards = 0;
    console.log(options[56]);
      //Loop That Creates 
     for(key of options) {
      if (key.polls_id == result) {
      
      $("<div>").text(key.question).appendTo($("body"));
      $("<div>").text(key.description).appendTo($("body"));
      currentTitle = key.title;
      howManyCards++;









      }
      //Fill Up Forms With Number For Ranking
      $(".maker-question").text(currentTitle);
    }
    $("<header>").text(currentTitle).appendTo($("body"));

  });
});