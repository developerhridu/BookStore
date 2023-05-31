document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Validate form fields
    if (!email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Validate email format using regex
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Invalid email format.';
        return;
    }

    // Clear any previous error message
    document.getElementById('emailError').textContent = '';

    // Get users from local storage
    let users = JSON.parse(localStorage.getItem('users'));

    // Check if email exists in the user data
    let user = users.find(function(user) {
        return user.email === email;
    });

    // Check if user exists
    if (!user) {
        alert('Email not found. Please sign up first.');
        return;
    }

    // Check if password matches
    if (user.password !== password) {
        alert('Incorrect password. Please try again.');
        return;
    }

    // Store the authenticated user ID in local storage
    localStorage.setItem('authenticatedUserId', user.id);

    // Redirect to home page
    window.location.href = 'home.html';
});