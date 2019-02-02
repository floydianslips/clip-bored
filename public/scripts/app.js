$(() => {
const url = window.location.href;
const result = /[^/]*$/.exec(url)[0];

  $.ajax({
    method: "GET",
    url: `/api/polls/${result}`
  }).done((options) => {
    for(option of options) {
      if (option.polls_id == result) {
        console.log(typeof option.polls_id)
      $("<div>").text(option.title).appendTo($("body"));
      $("<div>").text(option.description).appendTo($("body"));
      }
    }
  });
});