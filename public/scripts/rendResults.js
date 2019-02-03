$(() => {
  const url = window.location.href;
  const result = url.split( '/' );
  const partUrl = result[4];
  let currentTitle = "";
   $.ajax({
      method: "GET",
      url: `/api/polls/${result}/results`
    }).done((options) => {
//        $("<header>").text(options[result].title).appendTo($("body"));
       for(option of options) {
        console.log(partUrl)
        if (option.polls_id == partUrl) {
        $("<div>").text(option.question).appendTo($("body"));
        $("<div>").text(option.description).appendTo($("body"));
        currentTitle = option.title
        }
      }
      $("<header>").text(currentTitle).appendTo($("body"));
    });
  });