
$(() => {
  console.log();
  $.ajax({
    method: "GET",
    url: "/api/polls/"
  }).done((options) => {
    alert(document.URL);
    for (let i=0; i < options.length; i++) {
      
      // let allOptionsForPoll = {};
      // allOptionsForPoll["option" + i] = {};
      // allOptionsForPoll["option" + i]['id'] = options[i]['id'];
      // allOptionsForPoll["option" + i]['polls_id'] = options[i]['polls_id'];
      // allOptionsForPoll["option" + i]['description'] = options[i]['description'];
      // allOptionsForPoll["option" + i]['title'] = options[i]['title'];
      // allOptionsForPoll["option" + i]['points'] = options[i]['points'];
      $("<div>").text(options[i]['title']).appendTo($("body"));
      $("<div>").text(options[i]['description']).appendTo($("body"));
    }
  });
});