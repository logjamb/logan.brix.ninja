var cvs = document.querySelector("#canvas");
cvs.width = window.innerWidth;
var ctx = cvs.getContext("2d");

// load images

var bird = new Image()
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

// some variables

var gap = 100;
var constant;
var frames = 0;

var bX = 10;
var bY = 150;

var gravity = 2;
var speed = 2;
var distance = 250;

var score = 0;

var paused = true;
var died = false;

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down

document.addEventListener("keydown", moveUp);
document.addEventListener("click", pauseGame);

function moveUp() {
    if (paused) {
        paused = false;
        draw();
        return;
    }
    if (died) {
        location.reload();
    }
    bY -= 42;
    fly.play();
}

function pauseGame() {
    if (died) {
        location.reload();
    }
    paused = !paused;

    if (!paused) {
        draw();
    }
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
};

// draw images

function draw() {
    frames++;

    bY += gravity;

    for (var i = 0; i < cvs.width; i += 287) {
        ctx.drawImage(bg, i, 0);
    }


    for (var i = 0; i < pipe.length; i++) {

        constant = pipeNorth.height + gap;
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x -= speed;

        if (pipe[i].x <= cvs.width - distance && pipe[i].x > cvs.width - distance - speed) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        // detect collision

        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cvs.height - fg.height) {
            died = true;
            // location.reload(); // reload the page
        }

        if (pipe[i].x < -pipeNorth.width + 5) {
            pipe.shift();
            i--;
            score++;
            scor.play();
        }


    }

    for (var i = 0; i < cvs.width; i += 287) {
        ctx.drawImage(fg, i, cvs.height - fg.height);
    }

    ctx.drawImage(bird, bX, bY);

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, cvs.height - 20);

    if (!paused && !died) {
        start = false;
        requestAnimationFrame(draw);
    }

}

var imagesLoaded = 0;
[bird, bg, fg, pipeNorth, pipeSouth].forEach(img => {
    img.addEventListener('load', () => {
        if (++imagesLoaded === 5) {
            draw();
        }
    }, false);
});