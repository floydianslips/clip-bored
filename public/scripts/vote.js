$(function() {
	var url = window.location.href;
	var result = /[^/]*$/.exec(url)[0];

	var currentTitle = "";
	var currentCardInPoll = 1;
	var locationOfVoteCards = $('.question-options-answers');

	function buildVoteCard(data) {
		var $optionWrapper = $("<div class='option-answer-wrapper'>");
		var $voteCardAnswerTitle = $("<h3 class='answer answer" + currentCardInPoll + "'>").text(data.question);
		var $voteCardAnswerDescription = $("<p class='answer-description answer" + currentCardInPoll + "'>").text(data.description);
		var $dropDown = $("<form class='vote-form vote-dropdown" + currentCardInPoll + "' name='dropdown" + currentCardInPoll + "'><label>Rank me:&nbsp; </label><select id='" + data.uniqueVoteId + "' class='vote-list" + currentCardInPoll + "'></select></form>");
		var $fullVoteCard = $optionWrapper.append($voteCardAnswerTitle).append($voteCardAnswerDescription).append($dropDown);
		return $fullVoteCard;
	}

	function loadAllVoteCards() {
	  $.ajax({
	    method: "GET",
	    url: `/api/polls/${result}`
	  }).done((options) => {
	    for(var key of options) {
				if (key.polls_id == result) {
					currentTitle = key.title;
					var newVoteCard = buildVoteCard(key);
					locationOfVoteCards.append(newVoteCard);
					currentCardInPoll++;
				}
				$(".maker-question").text(currentTitle);
			}
			//Loop That Inserts The Value Options Into Each Vote Card
			$('select').each(function(index) {
				for (var i = 1; i < currentCardInPoll; i++) {
					$(this).append("<option value = '" + i + "'>" + i + "</option>");
				}
			});
		});
		}

	$('#submit-votes').on('click', function(event) {
		event.preventDefault();
		var votePayload = {
			'whichPoll': result,
			'newVotes': {
				'vote0': {
					'id': 0,
					'points': 0,
				},
				'vote1': {
					'id': 0,
					'points': 0,
				}
			},
		};
		$('select').each(function(index) {
			votePayload['newVotes']['vote' + index] = {
				'id': $(this).attr('id'),
				'points': currentCardInPoll - $(this).val() - 1,
				'rank': Number($(this).val()),
			};
		});

		var filteringValues = [];
		for (var key in votePayload['newVotes']){
			filteringValues.push(votePayload['newVotes'][key]['rank']);
		}
		while (filteringValues.length > 0) {
			num = filteringValues.pop();
			if (filteringValues.includes(num)) {
				alert('You have ranked two things as the same!');
				return;
			}
		}

		$.ajax({
			url: '/polls/' + result,
			type: "PUT",
			data: votePayload,
			success: function(response){
				location.href = response;
			}
	  });
	});

	//Initates Loading Of VoteCards
	loadAllVoteCards();
});