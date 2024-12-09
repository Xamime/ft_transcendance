let IA = false;
let upKey, upKey2, downKey, downKey2;
let button = "";
let canvas = "";
let context = "";
let canvasStyle = "";
let paddleWidth, paddleHeight, paddleSpeed;
let ballX,ballY, ballRadius, ballSpeedX, ballSpeedY, score1, score2;
const keysPressed = {}; // Object to track pressed keys

function initPong() {
    button = document.getElementById('startCanvas');
    canvas = document.querySelector('canvas');
    if (!canvas) {
        alert("Canvas element not found!");
        return;
    }
    canvasStyle = window.getComputedStyle(canvas);
    canvas.width = parseInt(canvasStyle.width, 10);
    canvas.height = parseInt(canvasStyle.height, 10);
    context = canvas.getContext('2d');
    paddleWidth = canvas.width / 40;
    paddleHeight = canvas.height / 5;
    paddleSpeed = 8;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballRadius = paddleHeight / 10;
    ballSpeedX = 7;
    ballSpeedY = 9;
    leftPaddleY = (canvas.height - paddleHeight) / 2;
    rightPaddleY = (canvas.height - paddleHeight) / 2;
    score1 = 0;
    score2 = 0;
    upKey = sessionStorage.getItem('upKey') || 'w';  // Valeur par défaut
    downKey = sessionStorage.getItem('downKey') || 's';
    upKey2 = sessionStorage.getItem('upKey2') || 'ArrowUp';
    downKey2 = sessionStorage.getItem('downKey2') || 'ArrowDown';
    if (sessionStorage.getItem('previousPage') == "/IA/") {
        IA = true;
    }
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function saveGameScore() {
        // Envoyer une requête POST avec fetch
        name_player2 = document.getElementById('p2').innerText;
        alert(name_player2);
        fetch('https://localhost/game/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // Ou 'application/json' si nécessaire
                // Ajoutez le token CSRF ici si vous ne désactivez pas CSRF :
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: new URLSearchParams({
                'player_one': "toto",
                'player_two': name_player2,
                'player_one_score': score1,
                'player_two_score': score2,
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status !== 'success') {
                alert('Erreur lors de l\'enregistrement.');
            }
        })
        .catch(error => console.error('Erreur:', error));  
}

document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false;
});

function drawPaddle(x, y) {
    context.fillStyle = 'white';
    context.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawMiddle() {
    context.setLineDash([10, 5]);
    context.lineWidth = 2;
    context.strokeStyle = 'white';
    context.beginPath();
    context.moveTo(canvas.width / 2 - 1, 0);
    context.lineTo(canvas.width / 2 - 1, canvas.height);
    context.stroke();
}

function drawBall() {
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
}

function checkIfScored() {
    if (ballX > canvas.width - paddleWidth || ballX < paddleWidth) {
        if (ballX - ballRadius < canvas.width / 2)
            score2++;
        else
        score1++;
    resetBall();
}
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX; // Change la direction de la balle
}

function drawScore() {
    document.getElementById('scoreP1').textContent = score1;
    document.getElementById('scoreP2').textContent = score2;
}

function updatePaddles() {
    if (keysPressed[upKey] && leftPaddleY - paddleSpeed > 0)
        leftPaddleY -= paddleSpeed;
    else if (keysPressed[downKey] && leftPaddleY + paddleSpeed + paddleHeight < canvas.height)
        leftPaddleY += paddleSpeed;
    if (!IA) {
        if (keysPressed[upKey2] && rightPaddleY - paddleSpeed > 0)
            rightPaddleY -= paddleSpeed;
        if (keysPressed[downKey2] && rightPaddleY + paddleSpeed + paddleHeight < canvas.height)
            rightPaddleY += paddleSpeed;
    }
}

// Mise à jour des positions de la balle
function updateBallPosition() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    // Collision avec le haut et le bas du canevas
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0)
        ballSpeedY = -ballSpeedY;
    // Collision avec la raquette gauche
    else if (ballX - ballRadius / 1.5 <= paddleWidth && ballY + ballRadius / 1.5 >= leftPaddleY && ballY - ballRadius / 1.5 <= leftPaddleY + paddleHeight)
        ballSpeedX = -ballSpeedX;
    // Collision avec la raquette droite
    else if (ballX + ballRadius / 1.5 >= canvas.width - paddleWidth && ballY + ballRadius / 1.5 >= rightPaddleY && ballY - ballRadius / 1.5 <= rightPaddleY + paddleHeight)
        ballSpeedX = -ballSpeedX;
}

function AImove() {
    if (IA == true ) 
        rightPaddleY = PongAII(ballY);
}

function gameLoop() {
    button.style.display = 'none';
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawMiddle();
    drawPaddle(0, leftPaddleY);
    drawPaddle(canvas.width - paddleWidth, rightPaddleY);
    updatePaddles();
    AImove();
    drawBall();
    updateBallPosition();
    checkIfScored();    
    drawScore();
    if (score1 == 1 || score2 == 1) {
        saveGameScore();
        button.style.display = "block";
        score1 = 0;
        score2 = 0;
        return;
    }
    requestAnimationFrame(gameLoop);
}

document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener('click', async function (event) {
        if (event.target && event.target.id === 'startCanvas') {
            initPong();
            gameLoop();
        } 
    }, true);
});