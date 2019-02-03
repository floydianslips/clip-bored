$(() => {
  const url = window.location.href;
  const result = /[^/]*$/.exec(url)[0];
    $.ajax({
      method: "GET",
      url: `/api/polls/${result}/results/`
    }).done((options) => {
       $("<header>").text(options[result].title).appendTo($("body"));
       for(option of options) {
        console.log(option.question)
        if (option.polls_id == result) {
        $("<div>").text(option.question).appendTo($("body"));
        $("<div>").text(option.description).appendTo($("body"));
        }
      }
    });
  });