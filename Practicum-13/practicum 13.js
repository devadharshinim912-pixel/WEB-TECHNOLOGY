
// Agricultural Task Management System

// Get HTML elements
let taskForm = document.getElementById("taskForm");
let taskName = document.getElementById("taskName");
let taskCategory = document.getElementById("taskCategory");
let taskDescription = document.getElementById("taskDescription");
let taskDate = document.getElementById("taskDate");
let taskPriority = document.getElementById("taskPriority");
let taskStatus = document.getElementById("taskStatus");

let taskList = document.getElementById("taskList");
let submitButton = document.getElementById("submitButton");
let cancelButton = document.getElementById("cancelButton");
let message = document.getElementById("message");

let totalTasks = document.getElementById("totalTasks");
let completedTasks = document.getElementById("completedTasks");
let pendingTasks = document.getElementById("pendingTasks");
let emptyMessage = document.getElementById("emptyMessage");

// Load saved tasks from Local Storage
let tasks = JSON.parse(localStorage.getItem("farmTasks")) || [];

let editingId = null;

// Save tasks in Local Storage
function saveTasks() {
    localStorage.setItem("farmTasks", JSON.stringify(tasks));
}

// Display all tasks
function displayTasks() {

    // Clear previous task rows
    taskList.innerHTML = "";

    // Display empty message if there are no tasks
    if (tasks.length === 0) {
        emptyMessage.textContent = "No tasks added yet.";
    }
    else {
        emptyMessage.textContent = "";
    }

    // Display each task
    tasks.forEach(function (task) {

        // Create a new table row
        let row = document.createElement("tr");

        // Create table cells
        let nameCell = document.createElement("td");
        let categoryCell = document.createElement("td");
        let descriptionCell = document.createElement("td");
        let dateCell = document.createElement("td");
        let priorityCell = document.createElement("td");
        let statusCell = document.createElement("td");
        let actionCell = document.createElement("td");

        // Add task information
        nameCell.textContent = task.name;
        categoryCell.textContent = task.category;
        descriptionCell.textContent = task.description;
        dateCell.textContent = task.date;
        priorityCell.textContent = task.priority;

        // Create status selection
        let statusSelect = document.createElement("select");

        let statusOptions = [
            "Pending",
            "In Progress",
            "Completed"
        ];

        statusOptions.forEach(function (status) {

            let option = document.createElement("option");
            option.value = status;
            option.textContent = status;

            statusSelect.appendChild(option);
        });

        statusSelect.value = task.status;

        // Update task status
        statusSelect.addEventListener("change", function () {

            let selectedTask = tasks.find(function (item) {
                return item.id === task.id;
            });

            if (selectedTask) {
                selectedTask.status = statusSelect.value;

                saveTasks();
                updateSummary();

                message.textContent = "Task status updated successfully!";
            }
        });

        statusCell.appendChild(statusSelect);

        // Create Edit button
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.setAttribute("class", "edit-button");

        editButton.addEventListener("click", function () {
            editTask(task.id);
        });

        // Create Delete button
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("class", "delete-button");

        deleteButton.addEventListener("click", function () {
            deleteTask(task.id);
        });

        // Add buttons to action cell
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        // Add all cells to the row
        row.appendChild(nameCell);
        row.appendChild(categoryCell);
        row.appendChild(descriptionCell);
        row.appendChild(dateCell);
        row.appendChild(priorityCell);
        row.appendChild(statusCell);
        row.appendChild(actionCell);

        // Add row to the table
        taskList.appendChild(row);

    });

    updateSummary();
}

// Update task summary
function updateSummary() {

    totalTasks.textContent = tasks.length;

    // Find completed tasks
    let completed = tasks.filter(function (task) {
        return task.status === "Completed";
    });

    // Find pending tasks
    let pending = tasks.filter(function (task) {
        return task.status === "Pending";
    });

    completedTasks.textContent = completed.length;
    pendingTasks.textContent = pending.length;
}

// Add or update a task
taskForm.addEventListener("submit", function (event) {

    // Prevent page reload
    event.preventDefault();

    // Get entered values
    let name = taskName.value.trim();
    let category = taskCategory.value;
    let description = taskDescription.value.trim();
    let date = taskDate.value;
    let priority = taskPriority.value;
    let status = taskStatus.value;

    // Check whether the task is being edited
    if (editingId !== null) {

        // Find the task to update
        let existingTask = tasks.find(function (task) {
            return task.id === editingId;
        });

        if (existingTask) {

            existingTask.name = name;
            existingTask.category = category;
            existingTask.description = description;
            existingTask.date = date;
            existingTask.priority = priority;
            existingTask.status = status;

            message.textContent = "Task updated successfully!";
        }

        editingId = null;
        submitButton.textContent = "Add Task";
        cancelButton.hidden = true;

    }

    // Create a new task
    else {

        let newTask = {
            id: Date.now(),
            name: name,
            category: category,
            description: description,
            date: date,
            priority: priority,
            status: status
        };

        // Add task to array
        tasks.push(newTask);

        message.textContent = "Task added successfully!";
    }

    // Save and display tasks
    saveTasks();
    displayTasks();

    // Clear the form
    taskForm.reset();

});

// Edit an existing task
function editTask(id) {

    // Find selected task
    let task = tasks.find(function (item) {
        return item.id === id;
    });

    if (task) {

        // Fill form with existing details
        taskName.value = task.name;
        taskCategory.value = task.category;
        taskDescription.value = task.description;
        taskDate.value = task.date;
        taskPriority.value = task.priority;
        taskStatus.value = task.status;

        editingId = id;

        submitButton.textContent = "Update Task";
        cancelButton.hidden = false;

        message.textContent = "Edit the task details and click Update Task.";

        // Move to the form
        taskForm.scrollIntoView({
            behavior: "smooth"
        });
    }
}

// Delete a task
function deleteTask(id) {

    // Remove selected task using filter()
    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    // Reset editing if deleted task was being edited
    if (editingId === id) {
        editingId = null;
        taskForm.reset();
        submitButton.textContent = "Add Task";
        cancelButton.hidden = true;
    }

    // Save updated task list
    saveTasks();
    displayTasks();

    message.textContent = "Task deleted successfully!";
}

// Cancel editing
cancelButton.addEventListener("click", function () {

    editingId = null;

    taskForm.reset();

    submitButton.textContent = "Add Task";
    cancelButton.hidden = true;

    message.textContent = "Editing cancelled.";
});

// Display saved tasks when page loads
displayTasks();
