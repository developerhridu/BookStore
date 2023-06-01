// Retrieve tasks from local storage
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to Display Task Table
function populateTable(filteredTasks) {
    const tableBody = document.getElementById('taskTableBody');
    tableBody.innerHTML = '';

    // Retrieve authenticated user ID from local storage
    const authenticatedUserId = localStorage.getItem('authenticatedUserId');

    const tasksToDisplay = filteredTasks || tasks; // Use filteredTasks if available, otherwise use all tasks

    tasksToDisplay.forEach(task => {
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


// Function to edit task
function editTask(taskId) {
    // Find the task with the matching ID
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        // Redirect the user to the createTask page and pass the task data as URL parameters
        const editUrl = `updateTask.html?taskId=${taskId}&taskName=${encodeURIComponent(task.taskName)}&taskCategory=${encodeURIComponent(task.taskCategory)}&taskStatus=${encodeURIComponent(task.taskStatus)}&taskDescription=${encodeURIComponent(task.taskDescription)}&responsiblePerson=${encodeURIComponent(task.responsiblePerson)}&startDate=${encodeURIComponent(task.startDate)}&endDate=${encodeURIComponent(task.endDate)}`;
        window.location.href = editUrl;
    }
}


// Function to handle the delete button functionality
function deleteTask(taskId) {
    // Find the task index with the matching ID
    const taskIndex = tasks.findIndex(t => t.id === taskId);



    if (taskIndex !== -1) {
        // Show a confirmation dialog
        const confirmation = confirm(`Are you sure you want to delete the task, id : ${taskId} ?`);

        if (confirmation) {
            // Remove the task from the array
            tasks.splice(taskIndex, 1);

            // Update tasks in local storage
            localStorage.setItem('tasks', JSON.stringify(tasks));

            // Repopulate the table
            populateTable();
        }
    }
}


// Initial population of the table
populateTable();

// Search
// function showList() {
//     // Retrieve data from local storage
//     const tasksData = localStorage.getItem('tasks');
//     const tasks = JSON.parse(tasksData) || [];
//
//     const filteredTasks = tasks.filter(task => {
//         const {
//             taskName,
//             taskCategory,
//             taskStatus,
//             responsiblePerson,
//             endDate
//         } = searchItem;
//
//         if (taskName && !task.taskName.toLowerCase().includes(taskName)) {
//             return false;
//         }
//
//         if (taskCategory.length > 0 && !taskCategory.includes(task.taskCategory)) {
//             return false;
//         }
//
//         if (taskStatus && task.taskStatus !== taskStatus) {
//             return false;
//         }
//
//         if (responsiblePerson && !task.responsiblePerson.toLowerCase().includes(responsiblePerson.toLowerCase())) {
//             return false;
//         }
//
//         if (endDate && task.endDate !== endDate) {
//             return false;
//         }
//
//         return true;
//     });
//
//
//     // Display the filtered tasks
//     populateTable(filteredTasks);
// }
function showList() {
    // Retrieve data from local storage
    const tasksData = localStorage.getItem('tasks');
    const tasks = JSON.parse(tasksData) || [];

    const filteredTasks = tasks.filter(task => {
        const {
            taskName,
            taskCategory,
            taskStatus,
            responsiblePerson,
            endDate
        } = searchItem;

        if (taskName && !task.taskName.toLowerCase().includes(taskName)) {
            return false;
        }

        if (taskCategory.length > 0 && !taskCategory.includes(task.taskCategory)) {
            return false;
        }

        if (taskStatus && task.taskStatus !== taskStatus) {
            return false;
        }

        if (responsiblePerson && !task.responsiblePerson.toLowerCase().includes(responsiblePerson.toLowerCase())) {
            return false;
        }

        if (endDate && task.endDate !== endDate) {
            return false;
        }

        return true;
    });

    // Display the filtered tasks
    populateTable(filteredTasks);
}



var searchItem = {};

// function handleSearch(event) {
//     event.preventDefault(); // Prevent form submission
//
//     // Retrieve search criteria from form inputs
//     const taskNameSearch = document.getElementById('taskNameSearch').value;
//     // const taskCategorySearch = Array.from(document.querySelectorAll('input[name="taskCategorySearch"]:checked')).map(checkbox => checkbox.value);
//     const taskCategoryInputs = Array.from(document.querySelectorAll('input[name="taskCategorySearch"]:checked'));
//     const taskCategorySearch = taskCategoryInputs.map(checkbox => checkbox.value);
//
//     const taskStatusInput = document.querySelector('input[name="taskStatus"]:checked');
//     const taskStatusSearch = taskStatusInput ? taskStatusInput.value : '';
//     const responsiblePersonSearch = document.getElementById('responsiblePersonSearch').value;
//     const endDateSearch = document.getElementById('endDateSearch').value;
//     debugger;
//     console.log(taskCategorySearch);
//     let tName = taskNameSearch.trim()
//     tName = tName.toLowerCase();
//     searchItem = {
//         taskName: tName,
//         taskCategory: taskCategorySearch,
//         taskStatus: taskStatusSearch,
//         responsiblePerson: responsiblePersonSearch,
//         endDate: endDateSearch,
//     };
//     // debugger;
//     // console.log(searchItem);
//     showList();
//
// }
function handleSearch(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve search criteria from form inputs
    const taskNameSearch = document.getElementById('taskNameSearch').value;

    const taskCategoryInputs = Array.from(document.querySelectorAll('input[name="taskCategory"]:checked'));
    const taskCategorySearch = taskCategoryInputs.map(checkbox => checkbox.value);

    const taskStatusInput = document.querySelector('input[name="taskStatus"]:checked');
    const taskStatusSearch = taskStatusInput ? taskStatusInput.value : '';

    const responsiblePersonSearch = document.getElementById('responsiblePersonSearch').value;
    const endDateSearch = document.getElementById('endDateSearch').value;
    debugger;
    console.log(taskCategorySearch);

    let tName = taskNameSearch.trim();
    tName = tName.toLowerCase();

    searchItem = {
        taskName: tName,
        taskCategory: taskCategorySearch,
        taskStatus: taskStatusSearch,
        responsiblePerson: responsiblePersonSearch,
        endDate: endDateSearch,
    };
    // debugger;
    console.log(searchItem);

    showList();
}

// debugger;
// console.log("hridu");
// Add event listener to the search form
document.getElementById('searchForm').addEventListener('submit', handleSearch);
