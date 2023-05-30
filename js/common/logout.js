// Logout function
function logout() {
    // Clear the authenticated user ID from local storage
    localStorage.removeItem('authenticatedUserId');

    // Redirect to the login page
    window.location.href = 'login.html';
}