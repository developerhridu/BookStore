document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Validate form fields
    if (!firstName || !lastName || !email || !password) {
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

    // Get existing users from local storage or initialize an empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    let emailExists = users.some(user => user.email === email);
    if (emailExists) {
        alert('Email already exists. Please choose a different email.');
        return;
    }

    // Create user object
    function generateID() {
        return 'user_' + Math.random().toString(36).substr(2, 9);
    }

    let user = {
        id: generateID(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    // Add new user to the array
    users.push(user);

    // Store updated user array in local storage
    localStorage.setItem('users', JSON.stringify(users));

    // Reset the form
    document.getElementById('registrationForm').reset();

    alert('Registration successful!');
});
