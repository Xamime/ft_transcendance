
document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener('submit', async function (event) {
        event.preventDefault();
        if (event.target && event.target.id === 'settings-form') {
            const form = document.getElementById('settings-form');
            sessionStorage.setItem('upKey', form.up_key.value);
            sessionStorage.setItem('downKey', form.down_key.value);
        }
        else if (event.target && event.target.id === 'settings-form2') {
            const form = document.getElementById('settings-form2');
            sessionStorage.setItem('upKey2', form.up_key2.value);
            sessionStorage.setItem('downKey2', form.down_key2.value);
        }
    }, true);
});