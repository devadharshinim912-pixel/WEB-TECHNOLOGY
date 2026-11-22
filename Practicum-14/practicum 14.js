
// Agricultural Products Explorer

// Product information
let products = [
    {
        id: 1,
        name: "Rice Seeds",
        category: "Seeds",
        description: "High-quality seeds suitable for rice cultivation.",
        price: "₹500 per packet"
    },
    {
        id: 2,
        name: "Organic Fertilizer",
        category: "Fertilizers",
        description: "Natural fertilizer that helps improve soil quality.",
        price: "₹350 per bag"
    },
    {
        id: 3,
        name: "Farm Equipment",
        category: "Equipment",
        description: "Useful equipment for regular agricultural activities.",
        price: "₹2500 onwards"
    },
    {
        id: 4,
        name: "Wheat Grains",
        category: "Grains",
        description: "Quality wheat grains for food production.",
        price: "₹40 per kg"
    },
    {
        id: 5,
        name: "Vegetable Seeds",
        category: "Seeds",
        description: "Seeds suitable for growing different vegetables.",
        price: "₹150 per packet"
    },
    {
        id: 6,
        name: "Soil Nutrients",
        category: "Fertilizers",
        description: "Nutrients that support healthy plant growth.",
        price: "₹400 per bag"
    }
];

// Select HTML elements
let searchInput = document.querySelector("#searchInput");
let categoryFilter = document.querySelector("#categoryFilter");
let resetButton = document.querySelector("#resetButton");
let productCards = document.querySelectorAll(".product-card");
let resultCount = document.querySelector("#resultCount");
let noResults = document.querySelector("#noResults");
let exploreButton = document.querySelector("#exploreButton");

// Function to search and filter products
function filterProducts() {

    let searchValue = searchInput.value.toLowerCase();
    let selectedCategory = categoryFilter.value;

    // Filter products based on name and category
    let filteredProducts = products.filter(function (product) {

        let matchesName = product.name.toLowerCase().includes(searchValue);

        let matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesName && matchesCategory;
    });

    let visibleIds = [];

    // Store matching product IDs
    filteredProducts.forEach(function (product) {
        visibleIds.push(product.id);
    });

    // Show or hide product cards
    productCards.forEach(function (card) {

        let id = Number(card.getAttribute("data-id"));

        if (visibleIds.includes(id)) {
            card.classList.remove("hidden");
        }
        else {
            card.classList.add("hidden");
        }
    });

    // Display result count
    resultCount.textContent =
        "Showing " + filteredProducts.length + " product(s)";

    // Show message if no products match
    if (filteredProducts.length === 0) {
        noResults.style.display = "block";
    }
    else {
        noResults.style.display = "none";
    }

}

// Search event
searchInput.addEventListener("input", filterProducts);

// Category filter event
categoryFilter.addEventListener("change", filterProducts);

// Reset search and filter
resetButton.addEventListener("click", function () {

    searchInput.value = "";
    categoryFilter.value = "All";

    filterProducts();

    // Close all product details
    document.querySelectorAll(".product-info").forEach(function (info) {
        info.classList.remove("show");
    });

});

// View product details
let detailButtons = document.querySelectorAll(".detailsButton");

detailButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        let productId = Number(button.getAttribute("data-id"));

        // Find the selected product
        let selectedProduct = products.find(function (product) {
            return product.id === productId;
        });

        // Find the corresponding product card
        let card = button.closest(".product-card");

        let info = card.querySelector(".product-info");

        // Display product information
        if (selectedProduct) {

            info.textContent =
                "Description: " + selectedProduct.description +
                " | Price: " + selectedProduct.price;

            info.classList.toggle("show");

            // Change button text
            if (info.classList.contains("show")) {
                button.textContent = "Hide Details";
                button.classList.add("active");
            }
            else {
                button.textContent = "View Details";
                button.classList.remove("active");
            }
        }

    });

});

// Explore products button
exploreButton.addEventListener("click", function () {

    document.querySelector("#products").scrollIntoView({
        behavior: "smooth"
    });

});

// Initial product display
filterProducts();
