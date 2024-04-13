$('[data-bs-toggle="tooltip"]').each(function () {
  new bootstrap.Tooltip(this);
});
$(".dropdown-menu").hide();

function calculateTax(grossIncome, extraIncome, deductions, age) {
  let overallIncome =
    parseInt(grossIncome) + parseInt(extraIncome) - parseInt(deductions);

  if (overallIncome <= 800000) {
    return 0;
  } else {
    let taxableAmount = overallIncome - 800000;
    let taxRate;

    if (age === "Less than 40") {
      taxRate = 0.3;
    } else if (age === "40 to 60") {
      taxRate = 0.4;
    } else if (age === "Greater than or equal to 60") {
      taxRate = 0.1;
    }

    return taxRate * taxableAmount;
  }
}

$(document).ready(function () {
  function calculateAndDisplayTax() {
    const grossIncome = parseFloat($("#gross-income").val());
    const extraIncome = parseFloat($("#extra-income").val());
    const deductions = parseFloat($("#deductions").val());
    const age = $("#age").val();
  
    const tax = calculateTax(grossIncome, extraIncome, deductions, age);
    const overallIncome = grossIncome + extraIncome - deductions - tax;
    $(".module h2").text(overallIncome);
  }

  $("#close").on("click", function () {
    $(".module").removeClass("show-module");
  });

  $("#submit").click(function (event) {
    let isValid = false;
    $("input[required]").each(function () {
      if ($(this).val() === "" || isNaN($(this).val())) {
        isValid = true;
        $(this).get(0).reportValidity();
        event.preventDefault();
        return false;
      }
    });

    if (!isValid) {
      let age = $("#age").val();
      let icon = $(".age-info");
      icon.hide();
      if (!age) {
        icon.show();
        event.preventDefault();
      } else {
        $(".module").addClass("show-module");
        calculateAndDisplayTax();
        event.preventDefault();
      }
    }
  });

  $(".dropdown-item").click(function () {
    let selectedValue = $(this).data("value");
    let age;

    if (selectedValue === "<40") {
      age = "Less than 40";
    } else if (selectedValue === "≥40&<60") {
      age = "40 to 60";
    } else if (selectedValue === "≥60") {
      age = "Greater than or equal to 60";
    }

    $("#age").val(age);
    $(".dropdown-menu").hide();
    calculateAndDisplayTax();
  });

  $("input").change(function () {
    calculateAndDisplayTax();
  });

  $("#drop-down").on("click", function () {
    $(".dropdown-menu").toggle();
  });

  $("input").on("input", function () {
    let value = $(this).val();
    let icon = $(this).siblings("img");
    if (isNaN(value)) {
      icon.show();
    } else {
      icon.hide();
    }
  });
});
