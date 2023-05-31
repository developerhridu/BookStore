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


