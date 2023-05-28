// script

document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var firstNameInput = document.getElementById("firstName");
    var lastNameInput = document.getElementById("lastName");
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");

    if (firstNameInput.checkValidity() && lastNameInput.checkValidity() && emailInput.checkValidity() && passwordInput.checkValidity()) {
        // Create user object
        var user = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };

        // Retrieve existing users data from local storage
        var users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if the email already exists
        var isEmailExists = users.some(function (existingUser) {
            return existingUser.email === user.email;
        });

        if (isEmailExists) {
            alert("Email already registered. Please use a different email.");
        } else {
            // Add the new user to the users array
            users.push(user);

            // Save the updated users data to local storage
            localStorage.setItem("users", JSON.stringify(users));

            // Redirect to the login page
            window.location.href = "login.html";
        }
    } else {
        // Handle form validation errors
        if (!firstNameInput.checkValidity()) {
            firstNameInput.classList.add("is-invalid");
        }
        if (!lastNameInput.checkValidity()) {
            lastNameInput.classList.add("is-invalid");
        }
        if (!emailInput.checkValidity()) {
            emailInput.classList.add("is-invalid");
        }
        if (!passwordInput.checkValidity()) {
            passwordInput.classList.add("is-invalid");
        }
    }
});


// login

// login.js

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");

    if (emailInput.checkValidity() && passwordInput.checkValidity()) {
        // Retrieve existing users data from local storage
        var users = JSON.parse(localStorage.getItem("users")) || [];

        // Find user with matching email and password
        var foundUser = users.find(function (user) {
            return user.email === emailInput.value && user.password === passwordInput.value;
        });

        if (foundUser) {
            // Redirect to the home page
            window.location.href = "home.html";
        } else {
            showError("Invalid email or password. Please try again.");
        }
    } else {
        if (!emailInput.checkValidity()) {
            showError("Please enter a valid email address.");
        }
        if (!passwordInput.checkValidity()) {
            showError("Please enter a password.");
        }
    }
});

function showError(errorMessage) {
    var errorElement = document.getElementById("error-message");
    errorElement.textContent = errorMessage;
    errorElement.style.display = "block";
}

