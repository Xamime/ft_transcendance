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

function getCsrfToken() {
    const metaCsrf = document.querySelector('meta[name="csrf-token"]');
    if (metaCsrf) {
        return metaCsrf.getAttribute('content');
    } else {
        console.error('CSRF token not found.');
        return null;
    }
}

function saveGameScore(player1, player2, score1, score2) {
    // Créer un formulaire dynamiquement
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/save_score/';
    
    // Ajouter le token CSRF
    const csrfToken = getCsrfToken();
    const csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = 'csrfmiddlewaretoken';
    csrfInput.value = csrfToken;
    form.appendChild(csrfInput);
    
    // Ajouter les données des joueurs et des scores
    const inputs = [
        { name: 'player1', value: player1 },
        { name: 'player2', value: player2 },
        { name: 'score_player1', value: score1 },
        { name: 'score_player2', value: score2 }
    ];
    inputs.forEach(({ name, value }) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
    });
    
    // Ajouter le formulaire au document et le soumettre
    document.body.appendChild(form);
    form.submit();
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
    if (score1 == 3 || score2 == 3) {
        // saveGameScore("max", "mamax", score1 ,score2);
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