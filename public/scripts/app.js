
$(() => {
  console.log();
  $.ajax({
    method: "GET",
    url: "/api/polls"
  }).done((options) => {
    alert(document.URL);
    for (let i=0; i < options.length; i++) {
      $("<div>").text(options[i]['title']).appendTo($("body"));
      $("<div>").text(options[i]['description']).appendTo($("body"));
    }
  });
});