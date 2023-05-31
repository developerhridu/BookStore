// Function to generate a unique ID
function generateID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function handleSubmit(event) {
    event.preventDefault();

    // Retrieve authenticated user ID from local storage
    const authenticatedUserId = localStorage.getItem('authenticatedUserId');

    // Return if authenticated user ID is not available
    if (!authenticatedUserId) {
        alert('Please log in to create a task.');
        return;
    }

    // Retrieve form values
    const taskName = document.getElementById('taskName').value;
    const taskCategory = Array.from(document.querySelectorAll('input[name="taskCategory"]:checked')).map(checkbox => checkbox.value);
    const taskStatus = document.querySelector('input[name="taskStatus"]:checked').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const responsiblePerson = document.getElementById('responsiblePerson').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    // Create new task object with unique ID and authenticated user ID
    const task = {
        id: generateID(),
        authenticatedUserId,
        taskName,
        taskCategory,
        taskStatus,
        taskDescription,
        responsiblePerson,
        startDate,
        endDate
    };

    // Retrieve existing tasks from local storage or initialize an empty array
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Add the new task to the existing tasks array
    existingTasks.push(task);

    // Store the updated tasks array in local storage
    localStorage.setItem('tasks', JSON.stringify(existingTasks));

    // Reset the form
    document.getElementById('createTaskForm').reset();

    // Show success message or perform any other action
    alert('Task created successfully!');
}


// Add form submit event listener
document.getElementById('createTaskForm').addEventListener('submit', handleSubmit);

// Function to retrieve the URL parameter value
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to decode URL parameter values
function decodeURLParameter(value) {
    return decodeURIComponent(value);
}

function populateTaskDetails() {
    // Retrieve task details from URL parameters
    const taskId = getURLParameter('taskId');
    const taskName = decodeURLParameter(getURLParameter('taskName'));
    const taskCategory = decodeURLParameter(getURLParameter('taskCategory'));
    const taskStatus = decodeURLParameter(getURLParameter('taskStatus'));
    const taskDescription = decodeURLParameter(getURLParameter('taskDescription'));
    const responsiblePerson = decodeURLParameter(getURLParameter('responsiblePerson'));
    const startDate = decodeURLParameter(getURLParameter('startDate'));
    const endDate = decodeURLParameter(getURLParameter('endDate'));

    // Fill the form fields with task details
    document.getElementById('taskName').value = taskName;


    // Check the checkboxes based on task category
    // const taskCategories = taskCategory.split(',');
    // taskCategories.forEach(category => {
    //   document.getElementById(taskCategory).checked = true;
    // });

    // Select the radio button based on task status
    // document.getElementById(taskStatus).checked = true;

    document.getElementById('taskDescription').value = taskDescription;
    document.getElementById('responsiblePerson').value = responsiblePerson;
    // document.getElementById('startDate').value = startDate;
    // document.getElementById('endDate').value = endDate;
}

// Call the populateTaskDetails function when the page is loaded
window.addEventListener('load', populateTaskDetails);
document.getElementById('updateButton').addEventListener('click', handleSubmit);