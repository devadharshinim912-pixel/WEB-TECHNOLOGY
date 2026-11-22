
// Agricultural Weather Dashboard

// Selecting HTML elements
let loadButton = document.getElementById("loadButton");
let weatherData = document.getElementById("weatherData");
let loading = document.getElementById("loading");
let errorMessage = document.getElementById("errorMessage");
let lastUpdated = document.getElementById("lastUpdated");

// Function to get weather information
async function getWeather() {

    // Show loading message
    loading.textContent = "Loading weather information...";
    errorMessage.textContent = "";
    lastUpdated.textContent = "";

    // Disable button while loading
    loadButton.disabled = true;

    try {

        // API endpoint for Salem weather
        let url = "https://api.open-meteo.com/v1/forecast?latitude=11.6643&longitude=78.1460&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m";

        // Fetch data from API
        let response = await fetch(url);

        // Check API response
        if (!response.ok) {
            throw new Error("Unable to fetch weather information.");
        }

        // Convert response into JSON
        let data = await response.json();

        // Get current weather details
        let current = data.current;

        // Clear previous table data
        weatherData.innerHTML = "";

        // Store weather details
        let details = [
            ["Temperature", current.temperature_2m + " °C"],
            ["Humidity", current.relative_humidity_2m + " %"],
            ["Precipitation", current.precipitation + " mm"],
            ["Wind Speed", current.wind_speed_10m + " km/h"]
        ];

        // Display each weather detail
        details.forEach(function (item) {

            // Create a table row
            let row = document.createElement("tr");

            // Create table cells
            let nameCell = document.createElement("td");
            let valueCell = document.createElement("td");

            // Add text to the cells
            nameCell.textContent = item[0];
            valueCell.textContent = item[1];

            // Add cells to the row
            row.appendChild(nameCell);
            row.appendChild(valueCell);

            // Add row to the table
            weatherData.appendChild(row);

        });

        // Display last updated time
        lastUpdated.textContent =
            "Weather data time: " + current.time;

    }

    catch (error) {

        // Display error message
        errorMessage.textContent =
            "Error: Unable to load weather data. Please try again.";

        weatherData.innerHTML = "";

        let row = document.createElement("tr");
        let cell = document.createElement("td");

        cell.setAttribute("colspan", "2");
        cell.textContent = "Weather information is unavailable.";

        row.appendChild(cell);
        weatherData.appendChild(row);

    }

    finally {

        // Hide loading message
        loading.textContent = "";

        // Enable button again
        loadButton.disabled = false;

    }

}

// Button click event
loadButton.addEventListener("click", getWeather);
