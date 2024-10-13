import LocalStorageManager from "../game/LocalStorageManager.js";

document.getElementById('submit').addEventListener('click', handleSubmit);

let localStorageManager = new LocalStorageManager();

function handleSubmit() {
    const username = document.getElementById('username').value.trim();

    if (username && username.length > 10    ) {
        alert('Пожалуйста, введите имя пользователя длиной 10 или менее.');
    } else if(username) {
        localStorageManager.saveUserName(username);
        window.location.href = 'main.html';
    } else {
        alert('Пожалуйста, введите имя пользователя.');
    }
}
