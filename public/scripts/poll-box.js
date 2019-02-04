$(function() {

  $(".question-options").on("focus", ".option", function() {

    let endNum = Number((this).name.substr(-1)) +1;
    let lastOption = ($(".option").last())[0];
    let optionName = lastOption.name;
    const optionInputWrapper = $("<div>").addClass("option-input-wrapper");
    const newInput = $("<input>").addClass( "option" ).attr( "placeholder", "And another response option..." ).attr( "name", `option${endNum}`);
    const fullInputWrapper = $(optionInputWrapper).append(newInput);
    const descriptionField = $("<input>").addClass( "description-field" ).attr( "placeholder", "Optional description..." ).attr( "name", `option-description${endNum}`);

    if (endNum >= 5) {
      return;
    } else if ((this).name == optionName) {
      $(".question-options").append(fullInputWrapper, descriptionField);
    }
  });

  $(".submit-btn").on("click", function() {
    event.preventDefault();
  });

});
