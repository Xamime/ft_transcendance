document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener('submit', async function (event) {
        if (event.target && event.target.id === 'register-form') {
            event.preventDefault(); 
            const success = await check_register(); 
            if (success) {
                alert('Registration success !');
                urlRoute('/board_player/');
            } else {
                alert('Registration failed. Please fix the errors and try again.');
            }
        } 
        else if (event.target && event.target.id === 'login-form') {
            event.preventDefault();
            const success = await check_login();
            if (success) {
                alert('Login success !');
                urlRoute('/board_player/');
            } else {
                alert('Login failed. Please check your credentials.');
            }
        }
        else if (event.target && event.target.id === 'color-form') {
            const success = await save_color();
            if (success) {
                alert('Color changed !');
            } else {
                alert('Color is not modified, please try again.');
            }
        }
    }, true);
});

async function save_color() {
    const color = document.getElementById('bar-color').value;
    
    const csrfToken = getCSRFToken();
    if (!csrfToken) {
        alert('CSRF Token is missing!');
        return false;
    }
    
    try {
        const response = await fetch("/save_color/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify ({ 
                color: color 
            }),
        });

        if (!response.ok) {
            alert(`HTTP error! Status: ${response.status}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) { return true; } else { return false; }
        }
        catch (error) {
            console.error('Error:', error);
            alert('An error occurred while validating. Please try again.');
            return false;
    }
}

async function check_register() {
    const username = document.getElementById('username-register').value.trim();
    const password = document.getElementById('password-register').value.trim();

    if (!username || !password) {
        alert('All fields are required!');
        return false;
    }

    const csrfToken = getCSRFToken();
    if (!csrfToken) {
        alert('CSRF Token is missing!');
        return false;
    }

    try {
        const response = await fetch('/check_register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
        
        if (!response.ok) {
            alert(`HTTP error! Status: ${response.status}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) { return true; } else { return false; }

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration. Please try again.');
        return false;
    }
}

async function check_login() {
    const username = document.getElementById('username-login').value.trim();
    const password = document.getElementById('password-login').value.trim();

    if (!username || !password) {
        alert('Both username and password are required!');
        return false;
    }

    const csrfToken = getCSRFToken();
    if (!csrfToken) {
        alert('CSRF Token is missing!');
        return false;
    }

    try {
        console.log('Sending login request...');
        const response = await fetch('/check_login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken, 
            },
            body: JSON.stringify({
                username: username, 
                password: password,
            }),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) { return true; } else { return false; }

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while validating. Please try again.');
        return false;
    }
}

function getCSRFToken() {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
    return csrfToken ? csrfToken.value : null;
}

