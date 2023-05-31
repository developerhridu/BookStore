// Retrieve tasks from local storage
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function populateTable() {
    const tableBody = document.getElementById('taskTableBody');
    tableBody.innerHTML = '';

    // Retrieve authenticated user ID from local storage
    const authenticatedUserId = localStorage.getItem('authenticatedUserId');

    tasks.forEach(task => {
        // Check if the task belongs to the authenticated user
        if (task.authenticatedUserId === authenticatedUserId) {
            const row = document.createElement('tr');
            row.innerHTML = `
        <td>${task.taskName}</td>
        <td>${task.taskCategory}</td>
        <td>${task.taskStatus}</td>
        <td>${task.taskDescription}</td>
        <td>${task.responsiblePerson}</td>
        <td>${task.startDate}</td>
        <td>${task.endDate}</td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="editTask('${task.id}')">
            <i class="fas fa-edit">Edit</i>
          </button>
        </td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteTask('${task.id}')">
            <i class="fas fa-trash">Delete</i>
          </button>
        </td>
      `;

            tableBody.appendChild(row);
        }
    });
}


function editTask(taskId) {
    // Find the task with the matching ID
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        // Redirect the user to the createTask page and pass the task data as URL parameters
        const editUrl = `updateTask.html?taskId=${taskId}&taskName=${encodeURIComponent(task.taskName)}&taskCategory=${encodeURIComponent(task.taskCategory)}&taskStatus=${encodeURIComponent(task.taskStatus)}&taskDescription=${encodeURIComponent(task.taskDescription)}&responsiblePerson=${encodeURIComponent(task.responsiblePerson)}&startDate=${encodeURIComponent(task.startDate)}&endDate=${encodeURIComponent(task.endDate)}`;
        window.location.href = editUrl;
    }
}


// Retrieve the task ID and task data from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('taskId');
const taskNameParam = urlParams.get('taskName');
const taskCategoryParam = urlParams.get('taskCategory');
const taskStatusParam = urlParams.get('taskStatus');
const taskDescriptionParam = urlParams.get('taskDescription');
const responsiblePersonParam = urlParams.get('responsiblePerson');
const startDateParam = urlParams.get('startDate');
const endDateParam = urlParams.get('endDate');


// Function to handle the delete button functionality
function deleteTask(taskId) {
    // Find the task index with the matching ID
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex !== -1) {
        // Remove the task from the array
        tasks.splice(taskIndex, 1);

        // Update tasks in local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Repopulate the table
        populateTable();
    }
}

// Initial population of the table
populateTable();