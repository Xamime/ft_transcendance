let IA = false;
if (document.referrer == "https://localhost/settings_game/local/IA/") {
    IA = true;
}
const upKey = localStorage.getItem('upKey') || 'w';  // Valeur par défaut
const downKey = localStorage.getItem('downKey') || 's';
const upKey2 = localStorage.getItem('upKey2') || 'ArrowUp';  // Valeur par défaut
const downKey2 = localStorage.getItem('downKey2') || 'ArrowDown'
localStorage.removeItem('downKey');
localStorage.removeItem('downKey2');
localStorage.removeItem('upKey');
localStorage.removeItem('upKey2');

// Sélectionner le canevas et définir son contexte
const button = document.getElementById('startCanvas');
const canvas = document.querySelector('canvas');
const canvasStyle = window.getComputedStyle(canvas);

// Obtenir la largeur et la hauteur calculées par CSS
canvas.width = parseInt(canvasStyle.width, 10);
canvas.height = parseInt(canvasStyle.height, 10);
const context = canvas.getContext('2d');

// Dimensions de la raquette
const paddleWidth = canvas.width / 40;
const paddleHeight = canvas.height / 5;
const paddleSpeed = 8;

// Ball settings
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = paddleHeight / 10;
let ballSpeedX = 7;
let ballSpeedY = 9 ;
let score1 = 0;
let score2 = 0;

// Raquette gauche et droite
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;
const keysPressed = {}; // Object to track pressed keys

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
    // else {
    //     rightPaddleY = ai.calculateMove(rightPaddleY, ballY);
    // }
}

// Mise à jour des positions de la balle
function updateBallPosition() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    // Collision avec le haut et le bas du canevas
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }
    // Collision avec la raquette gauche
    else if (ballX - ballRadius / 1.5 <= paddleWidth && ballY + ballRadius / 1.5 >= leftPaddleY && ballY - ballRadius / 1.5 <= leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    // Collision avec la raquette droite
    else if (ballX + ballRadius / 1.5 >= canvas.width - paddleWidth && ballY + ballRadius / 1.5 >= rightPaddleY && ballY - ballRadius / 1.5 <= rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
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
    if (score1 == 10 || score2 == 10) {
        button.style.display = "block";
        score1 = 0;
        score2 = 0;
        return;
    }
    requestAnimationFrame(gameLoop);
}

button.addEventListener('click', gameLoop);
