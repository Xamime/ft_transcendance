const AI_UPDATE_INTERVAL = 1000;
let lastAIUpdate = 0;
let AIballY;
let AIballX;
let final_posY;
let AIspeedY;
let AIspeedX;

function PongAII() {

	const currentTime = Date.now();
	if (lastAIUpdate == 0) {
		AIballY = ballY;
		AIballX = ballX;
		AIspeedY = ballSpeedY;
		AIspeedX = ballSpeedX;
		final_posY = algo();
	}
	if (currentTime - lastAIUpdate >= AI_UPDATE_INTERVAL) {
		lastAIUpdate = currentTime;
		AIballY = ballY;
		AIballX = ballX;
		AIspeedY = ballSpeedY;
		AIspeedX = ballSpeedX;
		// calcul 1 fois/sec et definir paddleY
		final_posY = algo();
	}

	const paddleCenter = rightPaddleY + paddleHeight / 2;
	if (paddleCenter < final_posY && rightPaddleY + paddleSpeed + paddleHeight < canvas.height)
		rightPaddleY += paddleSpeed;
	else if (paddleCenter > final_posY && rightPaddleY - paddleSpeed > 0) 
		rightPaddleY -= paddleSpeed;
	return rightPaddleY; 
}

function algo() {

	let final = AIballY;
	// nb frame pour que la ball arrive sur le x de la raquette de droite
	const timeToReachPaddle = (canvas.width - paddleWidth - AIballX) / AIspeedX;
	for (let i = 0; i < timeToReachPaddle; i++){
		if (final + AIspeedY > canvas.height || final + AIspeedY < 0)
			AIspeedY = -AIspeedY
		final += AIspeedY;
	}
	return final;	
}