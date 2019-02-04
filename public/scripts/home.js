$(() => {

//Logic For Poll Submission
	$("#manifest-poll").on("click", function(event) {
		event.preventDefault();
  	let email = $(".email").val();
  	let question = $(".question").val();
  	let newPollPayload = {
  				"newPoll": {
      			"maker": email,
       		  "title": question
        	},
       		"options": {
        	}
				};

	//Check For User Errors
		if (!$(".question").val()) {
  	  alert('You Forgot Your Question!');
    	return;
  	}
  	if (!$("input[name=option0]").val() || !$("input[name=option1]").val()) {
    	alert('You Need At Least 2 Options In Your Poll!');
    	return;
  	}
 	  if (!$(".email").val()) {
			alert('You Forgot Your E-mail!');
 	  	return;
 	 	}

		//Code To Add Iterate Over  Options And Add Them To The JSON Payload
 	 	$('.option').each(function(i, obj) {
		 	console.log('Found An Option!');
 	  	if (!$("input[name=option" + [i] + "]").val()) {
 	  	  return;
 	  	} else {
 	 			 	newPollPayload['options']['option' + i] = {
						title: $("input[name=option" + [i] + "]").val(),
		      	description: $("input[name=option-description" + [i] + "]").val()
 	        };
 	   	}
		});

 	  //Send newPollPayload In Body To Server With AJAX
 		$.ajax({
 	  	url: '/polls',
 	  	type: "POST",
 	  	data: newPollPayload,
 	   	success: function(response){
 	   	 location.href = response;
 	   	}
  	});
	});
});