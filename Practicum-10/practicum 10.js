
// Farm Inventory Management

// Selecting HTML elements
let itemName = document.getElementById("itemName");
let itemCategory = document.getElementById("itemCategory");
let itemQuantity = document.getElementById("itemQuantity");

let addButton = document.getElementById("addButton");
let inventoryList = document.querySelector("#inventoryList");
let message = document.getElementById("message");
let totalCount = document.getElementById("totalCount");

let editingItem = null;

// Function to add or update a product
function manageProduct() {

    let name = itemName.value.trim();
    let category = itemCategory.value.trim();
    let quantity = itemQuantity.value.trim();

    // Check whether fields are empty
    if (name === "" || category === "" || quantity === "") {
        message.textContent = "Please fill all the fields!";
        return;
    }

    // Check quantity
    if (Number(quantity) <= 0 || !Number.isInteger(Number(quantity))) {
        message.textContent = "Enter a valid quantity!";
        return;
    }

    // Update an existing product
    if (editingItem !== null) {

        let details = editingItem.querySelector(".product-details");

        details.children[0].textContent = "Name: " + name;
        details.children[1].textContent = "Category: " + category;
        details.children[2].textContent = "Quantity: " + quantity;

        editingItem = null;
        addButton.textContent = "Add Product";

        message.textContent = "Product updated successfully!";
    }

    // Add a new product
    else {

        // Create list item and details section
        let li = document.createElement("li");
        let details = document.createElement("div");

        details.setAttribute("class", "product-details");

        // Create product details
        let nameText = document.createElement("span");
        let categoryText = document.createElement("span");
        let quantityText = document.createElement("span");

        nameText.textContent = "Name: " + name;
        categoryText.textContent = "Category: " + category;
        quantityText.textContent = "Quantity: " + quantity;

        details.appendChild(nameText);
        details.appendChild(categoryText);
        details.appendChild(quantityText);

        // Create Edit button
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.setAttribute("class", "edit-button");

        // Create Remove button
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.setAttribute("class", "remove-button");

        // Edit product
        editButton.addEventListener("click", function () {

            editingItem = li;

            itemName.value = nameText.textContent.replace("Name: ", "");
            itemCategory.value = categoryText.textContent.replace("Category: ", "");
            itemQuantity.value = quantityText.textContent.replace("Quantity: ", "");

            addButton.textContent = "Update Product";
            message.textContent = "Edit the details and click Update Product.";
        });

        // Remove product
        removeButton.addEventListener("click", function () {

            if (editingItem === li) {
                editingItem = null;
                addButton.textContent = "Add Product";

                itemName.value = "";
                itemCategory.value = "";
                itemQuantity.value = "";
            }

            li.remove();

            totalCount.textContent = inventoryList.children.length;
            message.textContent = "Product removed successfully!";
        });

        // Add elements to the list
        li.appendChild(details);
        li.appendChild(editButton);
        li.appendChild(removeButton);

        inventoryList.appendChild(li);

        message.textContent = "Product added successfully!";
    }

    // Clear input fields
    itemName.value = "";
    itemCategory.value = "";
    itemQuantity.value = "";

    // Update total count
    totalCount.textContent = inventoryList.children.length;
}

// Add button event
addButton.addEventListener("click", manageProduct);

// Explore button event
document.getElementById("exploreButton").addEventListener("click", function () {
    document.getElementById("inventory").scrollIntoView({
        behavior: "smooth"
    });
});

// Display message when inventory section is clicked
document.getElementById("inventory").addEventListener("click", function () {
    message.innerHTML = "";
});
