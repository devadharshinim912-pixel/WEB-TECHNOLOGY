
// Getting HTML elements
let welcomeButton = document.getElementById("welcomeButton");
let aboutButton = document.getElementById("aboutButton");
let aboutInfo = document.getElementById("aboutInfo");

let productButton = document.getElementById("productButton");
let productBox = document.querySelector(".product-box");

let notification = document.getElementById("notification");
let notificationText = document.getElementById("notificationText");


// Function to display notification
function showNotification(text) {

    notificationText.textContent = text;

    // Adding show class to display notification
    notification.classList.add("show");

    // Removing notification after 3 seconds
    setTimeout(function() {
        notification.classList.remove("show");
    }, 3000);
}


// Welcome button click event
welcomeButton.addEventListener("click", function() {

    showNotification("Welcome to GreenHarvest Industries!");

});


// About button click event
aboutButton.addEventListener("click", function() {

    // Toggling the information section
    aboutInfo.classList.toggle("hidden");

    if (aboutInfo.classList.contains("hidden")) {

        aboutButton.textContent = "Show More Information";

    } else {

        aboutInfo.classList.add("show-info");
        aboutButton.textContent = "Show Less Information";

    }

});


// Service card buttons
let infoButtons = document.querySelectorAll(".infoButton");

infoButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Finding the information inside the same card
        let extraInfo = button.nextElementSibling;

        // Toggling the information
        extraInfo.classList.toggle("hidden");

        if (extraInfo.classList.contains("hidden")) {

            button.textContent = "Learn More";

        } else {

            extraInfo.classList.add("show-info");
            button.textContent = "Show Less";

        }

    });

});


// Product button click event
productButton.addEventListener("click", function() {

    // Showing or hiding the product information
    productBox.classList.toggle("hidden");

    if (productBox.classList.contains("hidden")) {

        productButton.textContent = "Show Products";

    } else {

        productButton.textContent = "Hide Products";
        productBox.classList.add("show-info");

    }

});


// Display notification when product button is clicked
productButton.addEventListener("click", function() {

    showNotification("Product section updated!");

});
