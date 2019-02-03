$(function() {

  $(".pencil-btn").on("click", function() {
    event.preventDefault();
  });

  $(".question-options").on("focus", ".option", function() {

    let endNum = Number((this).name.substr(-1)) +1;
    let lastOption = ($(".option").last())[0];
    let optionName = lastOption.name;


    const optionInputWrapper = $("<div>").addClass("option-input-wrapper");
    const newInput = $("<input>").addClass( "option" ).attr( "placeholder", "And another..." ).attr( "name", `option${endNum}`);
    // const newPencil = $("<btn>").addClass("pencil-btn", "btn-sm").text("✏️");
    const fullInputWrapper = $(optionInputWrapper).append(newInput);
    const descriptionField = $("<input>").addClass( "description-field" ).attr( "placeholder", "Description..." ).attr( "name", `option-description${endNum}`);


    if (endNum >= 6) {
      return;
    } else if ((this).name == optionName) {
      $(".question-options").append(fullInputWrapper, descriptionField);
    }
  });

  $(".submit-btn").on("click", function() {
    event.preventDefault();
    //check to see that at least two question fields and email is filled out, then if yes, POST form content.
  });

});
