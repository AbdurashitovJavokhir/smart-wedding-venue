// Default credentials
const DEFAULT_USERNAME = 'testuser';
const DEFAULT_PASSWORD = 'testuser';
const SESSION_FLAG = 'weddingAppLoggedIn';

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Clear previous error
    errorMessage.textContent = '';

    // Validate credentials
    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
        // Set session flag
        sessionStorage.setItem(SESSION_FLAG, 'true');

        // Redirect to wedding venue finder
        window.location.href = 'wedding-venue-finder.html';
    } else {
        // Show error message
        errorMessage.textContent = 'Invalid username or password';

        // Clear password field
        document.getElementById('password').value = '';
    }
});

// Prevent guest button from doing anything
document.querySelector('.guest-button').addEventListener('click', function(e) {
    e.preventDefault();
});

// Prevent forgot password link from doing anything
document.querySelector('.forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
});

// Prevent sign up link from doing anything
document.querySelector('.signup-link').addEventListener('click', function(e) {
    e.preventDefault();
});
