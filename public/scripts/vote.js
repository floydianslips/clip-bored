$(() => {
const url = window.location.href;
const result = /[^/]*$/.exec(url)[0];
let currentTitle = "";
let currentCardInPoll = 1;
let locationOfVoteCards = $('.question-options-answers');


function buildVoteCard(data) {
	let $optionWrapper = $("<div class='option-answer-wrapper'>");
	let $voteCardAnswerTitle = $("<h3 class='answer answer" + currentCardInPoll + "'>").text(data.question);
	let $voteCardAnswerDescription = $("<p class='answer-description answer" + currentCardInPoll + "'>").text(data.description);
	let $dropDown = $("<form class='vote-form vote-dropdown" + currentCardInPoll + "' name='dropdown" + currentCardInPoll + "'><label>Rank me: </label><select class='vote-list" + currentCardInPoll + "'></select></form>");
	let $fullVoteCard = $optionWrapper.append($voteCardAnswerTitle).append($voteCardAnswerDescription).append($dropDown);
	return $fullVoteCard;
}

function loadAllVoteCards() {
  $.ajax({
    method: "GET",
    url: `/api/polls/${result}`
  }).done((options) => {
      //Loop That Creates the Cards
    for(key of options) {
			if (key.polls_id == result) {
			currentTitle = key.title;
			const newVoteCard = buildVoteCard(key);
			locationOfVoteCards.append(newVoteCard);
			currentCardInPoll++;
			}
			$(".maker-question").text(currentTitle);
		}
		//Loop That Inserts The Value Options Into Each Vote Card
		$('select').each(function(index) {
			for (let i = 1; i < currentCardInPoll; i++) {
				$(this).append("<option value = '" + i + "'>" + i + "</option>");
			}
		});
	})
};
//Initates All God
loadAllVoteCards();
});