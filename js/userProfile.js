// Retrieve authenticated user ID from local storage
var authenticatedUserId = localStorage.getItem('authenticatedUserId');

// Get users from local storage
var users = JSON.parse(localStorage.getItem('users'));

// Find the authenticated user by ID
var authenticatedUser = users.find(function(user) {
    return user.id === authenticatedUserId;
});

// Display user information dynamically in a table
var userProfileTable = document.getElementById('userProfileTable');
userProfileTable.innerHTML = `
        <tr>
            <td>${authenticatedUser.firstName}</td>
            <td>${authenticatedUser.lastName}</td>
            <td>${authenticatedUser.email}</td>
        </tr>
    `;