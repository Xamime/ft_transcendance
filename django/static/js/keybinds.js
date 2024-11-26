document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('focus', () => {
        const keyHandler = (event) => {
            input.value = event.key; // Enregistre la touche appuyée
            event.preventDefault(); // Empêche tout comportement par défaut
            document.removeEventListener('keydown', keyHandler); // Supprime l'écouteur
            input.blur(); // Retire le focus
        };
        document.addEventListener('keydown', keyHandler);
    });
});

const form = document.getElementById('settings-form');
const form2 = document.getElementById('settings-form2');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Empêcher le rechargement de la page
    localStorage.setItem('upKey', form.up_key.value);
    localStorage.setItem('downKey', form.down_key.value);
});
form2.addEventListener('submit', function(ee) {
    ee.preventDefault(); // Empêcher le rechargement de la page
    localStorage.setItem('upKey2', form2.up_key2.value);
    localStorage.setItem('downKey2', form2.down_key2.value);
});