const inputField = document.getElementById("taskInput");
const addButton = document.getElementById("addTaskBtn");

const pendingTasks = document.getElementById("pendingList");
const completedTasks = document.getElementById("completedList");

const pendingLabel = document.getElementById("pendingCount");
const completedLabel = document.getElementById("completedCount");

const totalLabel = document.getElementById("totalCount");
const progressLabel = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

const pendingMessage = document.getElementById("pendingEmpty");
const completedMessage = document.getElementById("completedEmpty");

let taskCollection = JSON.parse(localStorage.getItem("tasks")) || [];

// ----------------------
// Event Listeners
// ----------------------

addButton.addEventListener("click", createTask);

inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        createTask();
    }
});

// ----------------------
// Add New Task
// ----------------------

function createTask() {

    const taskText = inputField.value.trim();

    if (!taskText) {
        alert("Please enter a task.");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toLocaleString(),
        completedAt: null
    };

    taskCollection.push(newTask);

    storeTasks();
    displayTasks();

    inputField.value = "";
}

// ----------------------
// Save Tasks
// ----------------------

function storeTasks() {
    localStorage.setItem("tasks", JSON.stringify(taskCollection));
}

// ----------------------
// Display Tasks
// ----------------------

function displayTasks() {

    pendingTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    taskCollection.forEach((item) => {

        const taskItem = document.createElement("li");
        taskItem.classList.add("task");

        taskItem.innerHTML = `
            <div class="task-info">
                <strong>${item.text}</strong>

                <div class="task-time">
                    Added: ${item.createdAt}
                    ${item.completedAt ? `<br>Completed: ${item.completedAt}` : ""}
                </div>
            </div>

            <div class="actions">
                <button class="complete" onclick="changeStatus(${item.id})">
                    ${item.completed ? "Undo" : "Complete"}
                </button>

                <button class="edit" onclick="updateTask(${item.id})">
                    Edit
                </button>

                <button class="delete" onclick="removeTask(${item.id})">
                    Delete
                </button>
            </div>
        `;

        if (item.completed) {
            completedTasks.appendChild(taskItem);
        } else {
            pendingTasks.appendChild(taskItem);
        }
    });

    refreshCounts();
    toggleEmptyMessages();
}

// ----------------------
// Update Counters
// ----------------------

function refreshCounts() {

    const pendingTotal = taskCollection.filter(item => !item.completed).length;
    const completedTotal = taskCollection.filter(item => item.completed).length;
    const totalTasks = pendingTotal + completedTotal;

    pendingLabel.textContent = pendingTotal;
    completedLabel.textContent = completedTotal;

    totalLabel.textContent = totalTasks;

    let progress = 0;

    if (totalTasks > 0) {
        progress = Math.round((completedTotal / totalTasks) * 100);
    }

    progressLabel.textContent = progress + "%";
    progressFill.style.width = progress + "%";
}

// ----------------------
// Empty List Messages
// ----------------------

function toggleEmptyMessages() {

    pendingMessage.style.display =
        pendingTasks.children.length ? "none" : "block";

    completedMessage.style.display =
        completedTasks.children.length ? "none" : "block";
}

// ----------------------
// Complete / Undo Task
// ----------------------

function changeStatus(taskId) {

    const selectedTask = taskCollection.find(task => task.id === taskId);

    if (!selectedTask) return;

    selectedTask.completed = !selectedTask.completed;

    selectedTask.completedAt = selectedTask.completed
        ? new Date().toLocaleString()
        : null;

    storeTasks();
    displayTasks();
}

// ----------------------
// Edit Task
// ----------------------

function updateTask(taskId) {

    const selectedTask = taskCollection.find(task => task.id === taskId);

    if (!selectedTask) return;

    const editedText = prompt("Edit your task:", selectedTask.text);

    if (editedText === null) return;

    const finalText = editedText.trim();

    if (!finalText) return;

    selectedTask.text = finalText;

    storeTasks();
    displayTasks();
}

// ----------------------
// Delete Task
// ----------------------

function removeTask(taskId) {

    taskCollection = taskCollection.filter(task => task.id !== taskId);

    storeTasks();
    displayTasks();
}

// ----------------------
// Initial Load
// ----------------------

displayTasks();