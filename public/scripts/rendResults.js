$(function() {

  // build poll results box
  function createOptionElement(data) {
    var $optionSection = $("<div class='option-answer-wrapper'>");
    var $optionRankText = $("<div id='header' class='rank' >").text("Ranked #");
    var $optionRank = $("<div id='header' class='place'>").text(rankNumber);
    var $optionPoints = $("<div id='header' class='b-points'>").text(data.points);
    var $optionQuestion = $("<h3 class='answer'>").text(data.question);
    var $optionDescription = $("<p class='answer-description' >").text(data.description);
    var $fullOption = $optionSection.append($optionRankText).append("  ").append($optionRank).append("  ").append("with: ").append("  ").append($optionPoints).append(" ").append("points is:").append($optionQuestion).append($optionDescription);
    return $fullOption;
  }

  var url = window.location.href;
  var pollUrl = url.substring(0, url.lastIndexOf("/"));
  var result = url.split('/');
  var partUrl = result[4];

  var allQuestions = $("#answer-box");
  var currentTitle = "";
  var rankNumber = 0;
  var voterCount = 0;

  // create and dynamically render results page
  function getOrderedOptions() {
    $.ajax({
      method: "GET",
      url: `/api/polls/${result}/results`
    }).done((options) => {
      allQuestions.empty();
      for (var key of options) {
        if (key.polls_id == partUrl) {
          rankNumber++;
          voterCount = key.voter_count;
          currentTitle = key.title;
          var element = createOptionElement(key);
          allQuestions.append(element);
        }
      }
      $(".maker-question").text(currentTitle).appendTo(".maker-question");
      // $(".voter-count").text("Total voters:").append(" ").append(voterCount).appendTo(".voter-count");
      $("#poll-link").attr('href', pollUrl).append(pollUrl);
    });
  }
  getOrderedOptions();

});
