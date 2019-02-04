$(function() {

  $(".pencil-btn").on("click", function() {
    event.preventDefault();
  });

  $(".question-options").on("focus", ".option", function() {
    var endNum = Number((this).name.substr(-1)) +1;
    var lastOption = ($(".option").last())[0];
    var optionName = lastOption.name;

    var optionInputWrapper = $("<div>").addClass("option-input-wrapper");
    var newInput = $("<input>").addClass( "option" ).attr( "placeholder", "And another response option..." ).attr( "name", `option${endNum}`);
    var fullInputWrapper = $(optionInputWrapper).append(newInput);
    var descriptionField = $("<input>").addClass( "description-field" ).attr( "placeholder", "Optional description..." ).attr( "name", `option-description${endNum}`);

    if (endNum >= 6) {
      return;
    } else if ((this).name == optionName) {
      $(".question-options").append(fullInputWrapper, descriptionField);
    }
  });

});
