$(() => {
  const url = window.location.href;
  const result = /[^/]*$/.exec(url)[0];
  let currentTitle = "";

// generate voter page
  $.ajax({
    method: "GET",
    url: `/api/polls/${result}`
  }).done((options) => {
      for(option of options) {
        if (option.polls_id == result) {
          $("<div>").text(option.question).appendTo($("body"));
          $("<div>").text(option.description).appendTo($("body"));
          currentTitle = option.title;
        }
      }
      $("<header>").text(currentTitle).appendTo($("body"));
  });
});