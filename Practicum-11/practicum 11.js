
// Farmer Registration Form

// Select the form
let farmerForm = document.getElementById("farmerForm");

// Select the message area
let formMessage = document.getElementById("formMessage");

// Select phone number input
let phone = document.getElementById("phone");

// Check phone number while typing
phone.addEventListener("input", function () {

    // Custom validation message
    if (phone.value.length !== 10) {
        phone.setCustomValidity("Phone number must contain exactly 10 digits.");
    }
    else {
        phone.setCustomValidity("");
    }

});

// Form submission event
farmerForm.addEventListener("submit", function (event) {

    // Prevent page reload
    event.preventDefault();

    // Check form validity
    if (farmerForm.checkValidity()) {

        // Display success message
        formMessage.textContent =
            "Registration submitted successfully! Welcome to GreenHarvest.";

        formMessage.style.color = "green";

        // Reset form fields
        farmerForm.reset();

        // Clear custom validation message
        phone.setCustomValidity("");

    }
    else {

        // Display validation errors
        farmerForm.reportValidity();

        formMessage.textContent =
            "Please correct the errors and fill all required fields.";

        formMessage.style.color = "red";
    }

});
