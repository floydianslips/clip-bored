$(() => {
const url = window.location.href;
const result = /[^/]*$/.exec(url)[0];
let currentTitle = "";
  
  $.ajax({
    method: "GET",
    url: `/api/polls/${result}`
  }).done((options) => {
     
     console.log(currentTitle)
     for(option of options) {
      
      if (option.polls_id == result) {
      $("<div>").text(option.question).appendTo($("body"));
      $("<div>").text(option.description).appendTo($("body"));
      currentTitle = option.title
      }

    }
    $("<header>").text(currentTitle).appendTo($("body"));
  });
});