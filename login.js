document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const formMessage = document.getElementById('form-message');
    const password = document.getElementById('password');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData);

        try {
            // Simulate a login/signup process
            // In a real application, this would be handled by a server
            localStorage.setItem('userName', data.name);
            localStorage.setItem('userEmail', data.email);
            localStorage.setItem('userRole', data.role);

            showMessage('Login successful. Redirecting...', 'success');
            setTimeout(() => redirectToDashboard(data.role), 2000);
        } catch (error) {
            console.error('Error:', error);
            showMessage('Login/Signup failed. Please try again.', 'error');
        }
    });

    function redirectToDashboard(role) {
        if (role === 'donor') {
            window.location.href = 'donor-dashboard.html';
        } else if (role === 'volunteer') {
            window.location.href = 'volunteer-dashboard.html';
        }
    }

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = type;
        formMessage.style.opacity = '1';
        setTimeout(() => {
            formMessage.style.opacity = '0';
        }, 3000);
    }
});
