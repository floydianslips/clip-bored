$(() => {

  // build poll results box
function createOptionElement (data) {
  let $optionSection = $("<div class='option-answer-wrapper'>");
  let $optionRankText = $("<div id='header' class='rank' >").text("Ranked:");
  let $optionRank = $("<div id='header' class='place'>").text(rankNumber);
  let $optionPoints = $("<div id='header' class='b-points'>").text(data.points);
  let $optionQuestion = $("<h3 class='answer'>").text(data.question);
  let $optionDescription = $("<p class=answer-description >").text(data.description);
  let $fullOption = $optionSection.append($optionRankText).append("  ").append($optionRank).append("  ").append("With: ").append("  ").append($optionPoints).append(" ").append("points").append($optionQuestion).append($optionDescription);
  return $fullOption;
  }

const url = window.location.href;
const result = url.split( '/' );
const partUrl = result[4];
const allQuestions = $("#answer-box");
let currentTitle = "";
let rankNumber = 0;
let voterCount = 0;

// create and dynamically render results page
  function getOrderedOptions() {
    $.ajax({
    method: "GET",
    url: `/api/polls/${result}/results`
    }).done((options) => {
        allQuestions.empty();
        for (key of options) {
          if (key.polls_id == partUrl) {
            rankNumber++;
            voterCount = key.voter_count;
            currentTitle = key.title;
            const element = createOptionElement(key);
            allQuestions.append(element);
          }
          $(".maker-question").text(currentTitle).appendTo(".maker-question");
          $(".voter-count").text("Total voters:").append(" ").append(voterCount).appendTo(".voter-count");
        }
    });
  }
getOrderedOptions();
});