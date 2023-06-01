
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


const tasksData = localStorage.getItem('tasks');
const tasksSearch = JSON.parse(tasksData) || [];
let filteredTasks = []; // Declare filteredTasks globally

function showList(searchItem) {
    filteredTasks = tasksSearch.filter(task => {
        const {
            taskName,
            taskStatus,
            responsiblePerson,
            endDate,
            workRelated,
            personal,
            academic
        } = searchItem;

        if (taskName && !task.taskName.toLowerCase().includes(taskName.toLowerCase())) {
            return false;
        }

        const categoryMatches = [];

        if (workRelated) {
            categoryMatches.push(task.taskCategory.includes(workRelated));
        }

        if (personal) {
            categoryMatches.push(task.taskCategory.includes(personal));
        }

        if (academic) {
            categoryMatches.push(task.taskCategory.includes(academic));
        }

        if (categoryMatches.length > 0 && categoryMatches.some(match => !match)) {
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

    console.log(filteredTasks);

    // Display the filtered tasks
    populateTable(filteredTasks);
}

function handleSearch(event) {
    event.preventDefault();

    // Retrieve search criteria from form inputs
    let searchItem = {};
    const taskNameSearch = document.getElementById('taskNameSearch').value;
    const workRelatedCheckbox = document.querySelector('#workRelated');
    const personalCheckbox = document.querySelector('#personal');
    const academicCheckbox = document.querySelector('#academic');
    const workRelated = workRelatedCheckbox.checked ? workRelatedCheckbox.value : null;
    const personal = personalCheckbox.checked ? personalCheckbox.value : null;
    const academic = academicCheckbox.checked ? academicCheckbox.value : null;
    const taskStatusInput = document.querySelector('input[name="taskStatus"]:checked');
    const taskStatusSearch = taskStatusInput ? taskStatusInput.value : '';
    const responsiblePersonSearch = document.getElementById('responsiblePersonSearch').value;
    const endDateSearch = document.getElementById('endDateSearch').value;


    let tName = taskNameSearch.trim();
    tName = tName.toLowerCase();

    searchItem = {
        taskName: tName,
        taskStatus: taskStatusSearch,
        responsiblePerson: responsiblePersonSearch,
        endDate: endDateSearch,
        workRelated: workRelated,
        personal: personal,
        academic: academic
    };


    showList(searchItem);
}


document.getElementById('searchForm').addEventListener('submit', handleSearch);



function generatePagination(totalPages, currentPage) {
    // Setting up variables and clearing the pagination container
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const maxVisiblePages = 3;
    // Calculating start and end page
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
    // Adding ellipsis or first page link if necessary
    if (startPage > 1) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.innerText = '1';
        link.addEventListener('click', () => {
            handlePageChange(1);
        });
        li.appendChild(link);
        paginationContainer.appendChild(li);

        if (startPage > 2) {
            const span = document.createElement('span');
            span.innerText = '.....';
            paginationContainer.appendChild(span);
        }
    }
    // Generating the page links within the visible range
    for (let i = startPage; i <= endPage; i++) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.innerText = i;
        link.classList.toggle('active', i === currentPage);
        link.addEventListener('click', () => {
            handlePageChange(i);
        });
        li.appendChild(link);
        paginationContainer.appendChild(li);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const span = document.createElement('span');
            span.innerText = '.....';
            paginationContainer.appendChild(span);
        }

        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.innerText = totalPages;
        link.addEventListener('click', () => {
            handlePageChange(totalPages);
        });
        li.appendChild(link);
        paginationContainer.appendChild(li);
    }
}


// Function to handle page change
function handlePageChange(pageNumber) {
    currentPage = pageNumber;
    const startIndex = (currentPage - 1) * itemsPerPage;
    // debugger
    const endIndex = startIndex + itemsPerPage;
    // debugger

    if (filteredTasks.length > 0) {
        const tasksToDisplay = filteredTasks.slice(startIndex, endIndex);
        populateTable(tasksToDisplay);
        generatePagination(totalFilteredPages, currentPage);
    } else {
        const tasksToDisplay = tasks.slice(startIndex, endIndex);
        populateTable(tasksToDisplay);
        generatePagination(totalPages, currentPage);
    }
}


const itemsPerPage = 2;
let totalPages = Math.ceil(tasks.length / itemsPerPage);
let totalFilteredPages = Math.ceil(filteredTasks.length / itemsPerPage);
let currentPage = 1; // Current page

handlePageChange(currentPage);
