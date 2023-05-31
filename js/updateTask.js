// Function to retrieve the URL parameter value
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to decode URL parameter values
// function decodeURLParameter(value) {
//     return decodeURIComponent(value);
// }

function updateTask(taskId, updatedTask) {
    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Find the index of the task with the matching ID
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex !== -1) {
        // Update the task at the found index
        tasks[taskIndex] = updatedTask;

        // Update tasks in local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function handleSubmit(event) {
    event.preventDefault();

    // Retrieve authenticated user ID from local storage
    const authenticatedUserId = localStorage.getItem('authenticatedUserId');

    // Return if authenticated user ID is not available
    if (!authenticatedUserId) {
        alert('Please log in to update a task.');
        return;
    }

    // Retrieve form values
    const taskId = getURLParameter('taskId');
    const taskName = document.getElementById('taskName').value;
    const taskCategory = Array.from(document.querySelectorAll('input[name="taskCategory"]:checked')).map(checkbox => checkbox.value);
    const taskStatus = document.querySelector('input[name="taskStatus"]:checked').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const responsiblePerson = document.getElementById('responsiblePerson').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    // Create updated task object
    const updatedTask = {
        id: taskId,
        authenticatedUserId,
        taskName,
        taskCategory,
        taskStatus,
        taskDescription,
        responsiblePerson,
        startDate,
        endDate
    };

    // Update the task in local storage
    updateTask(taskId, updatedTask);

    // Show success message or perform any other action
    alert('Task updated successfully!');
    // Redirect to home page
    window.location.href = 'home.html';
}


function populateTaskDetails() {
    // Retrieve task ID from URL parameters
    const taskId = getURLParameter('taskId');

    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Find the task with the matching ID
    const task = tasks.find(t => t.id === taskId);
    console.log(task);

    if (task) {
        // Fill the form fields with task details
        document.getElementById('taskName').value = task.taskName
        document.getElementById('taskDescription').value = task.taskDescription;
        document.getElementById('responsiblePerson').value = task.responsiblePerson;
        document.getElementById('startDate').value = task.startDate;
        document.getElementById('endDate').value = task.endDate;

        // Check the checkboxes based on task category
        const taskCategory = task.taskCategory;
        const checkboxes = document.querySelectorAll('input[name="taskCategory"]');
        checkboxes.forEach(checkbox => {
            if (taskCategory.includes(checkbox.value)) {
                checkbox.checked = true;
            }
        });
        // Retrieve the task status radio button value from local storage
        const taskStatus = task.taskStatus;

        // Select the radio button based on task status
        const radioButtons = document.querySelectorAll('input[name="taskStatus"]');
        radioButtons.forEach(radio => {
            if (radio.value === taskStatus) {
                radio.checked = true;
            }
        });

        // Select the radio button based on task status
        document.getElementById(task.taskStatus).checked = true;
    }
}


// Call the populateTaskDetails function when the page is loaded
window.addEventListener('load', populateTaskDetails);
document.getElementById('updateTaskForm').addEventListener('submit', handleSubmit);