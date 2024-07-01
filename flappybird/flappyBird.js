document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const gameContainer = document.querySelector('.game-container');
    const scoreDisplay = document.getElementById('score');

    let birdTop = 220;
    let birdLeft = 50;
    let gravity = 2;
    let isGameOver = false;
    let score = 0;

    function startGame() {
        if (!isGameOver) {
            birdTop += gravity;
            bird.style.top = birdTop + 'px';
        }
    }

    let gameTimerId = setInterval(startGame, 20);

    function control(e) {
        if (e.keyCode === 32) { // Spacebar
            jump();
        }
    }

    function jump() {
        if (birdTop > 20) {
            birdTop -= 50;
            bird.style.top = birdTop + 'px';
        }
    }

    document.addEventListener('keyup', control);

    function generatePipe() {
        const pipe = document.createElement('div');
        let pipePosition = 400;
        let randomHeight = Math.floor(Math.random() * 200) + 150;
        pipe.classList.add('pipe');
        pipe.style.height = randomHeight + 'px';
        gameContainer.appendChild(pipe);

        let pipeTimerId = setInterval(() => {
            if (pipePosition === -60) {
                clearInterval(pipeTimerId);
                gameContainer.removeChild(pipe);
            }

            if (pipePosition > 0 && pipePosition < 60 && birdLeft === 200 && (birdTop < randomHeight || birdTop > randomHeight + 130)) {
                gameOver();
            }

            pipePosition -= 5;
            pipe.style.left = pipePosition + 'px';
        }, 20);

        if (!isGameOver) {
            setTimeout(generatePipe, 3000);
        }

        if (pipePosition === 0) {
            score++;
            scoreDisplay.textContent = score;
        }
    }

    generatePipe();

    function gameOver() {
        clearInterval(gameTimerId);
        isGameOver = true;
        document.removeEventListener('keyup', control);
        alert('Game Over!');
    }
});