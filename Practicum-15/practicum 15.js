
// Get the toggle switch and status elements
let toggle = document.getElementById("irrigationToggle");
let statusText = document.getElementById("statusText");
let statusBox = document.getElementById("statusBox");

// Load the saved setting from Local Storage
let savedSetting = localStorage.getItem("irrigationStatus");

// Set the toggle according to the saved value
if (savedSetting === "enabled") {
    toggle.checked = true;
} else {
    toggle.checked = false;
}

// Function to update the application
function updateStatus() {

    if (toggle.checked) {
        statusText.textContent = "Automatic Irrigation is ON";
        statusBox.classList.toggle("active", true);
        localStorage.setItem("irrigationStatus", "enabled");
    } 
    else {
        statusText.textContent = "Automatic Irrigation is OFF";
        statusBox.classList.toggle("active", false);
        localStorage.setItem("irrigationStatus", "disabled");
    }
}

// Listen for changes in the toggle switch
toggle.addEventListener("change", updateStatus);

// Display the saved setting when the page loads
updateStatus();
