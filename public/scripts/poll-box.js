$(function() {


  $(".pencil-btn").on("click", function() {
    event.preventDefault();
  });

  $(".question-options").on("focus", ".option", function() {
    let endNum = Number((this).name.substr(6)) +1;
    let lastOption = ($(".option").last())[0];
    let optionName = lastOption.name;

    const optionInputWrapper = $("<div>").addClass("option-input-wrapper");
    const newInput = $("<input>").addClass( "option" ).attr( "placeholder", "And another..." ).attr( "name", `option${endNum}`);
    const newPencil = $("<btn>").addClass("pencil-btn", "btn-sm").text("✏️");
    const allTogetherNow = $(optionInputWrapper).append(newInput, newPencil);

    if (endNum >= 7) {
      return;
    } else if ((this).name == optionName) {
      $(allTogetherNow).insertAfter(this).parent(".option-input-wrapper");
    }
  });

});
