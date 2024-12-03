document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener('click', async function (event) {
        if (event.target && event.target.id === 'logout-button') {
            const success = await logoutUser();
            if (success) {
                alert("You are desconnected !");
                urlRoute('/welcome/');
            } else {
                alert("Deconnexion failed, try again.");
            }
        }
    });
});

async function logoutUser() {
    try {
        alert("Sending logout request...");
        const response = await fetch('/check_logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            alert(`HTTP error! status: ${response.status}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
            alert('Response is not JSON!');
            throw new Error('Response is not JSON');
        }

        const data = await response.json();
//        alert(`Logout response received: ${JSON.stringify(data)}`);
        return data.success; 
    } catch (error) {
        alert(`Error during logout: ${error.message}`);
        console.error('Error during logout:', error);
        return false;
    }
}

