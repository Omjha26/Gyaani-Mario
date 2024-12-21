const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const gameOver = document.querySelector('.game_over');
const summaryScreen = document.querySelector('.summary-screen');
const restartBtn = document.querySelector('#restart-btn');
const popup = document.querySelector('.popup');
const nextBtn = document.querySelector('#next-btn');

let currentPosition = -80;
let speed = 5;
const speedIncrement = 0.5;
const speedIntervalTime = 500;
let gameRunning = true;
let showingPopup = false;

const jumpSound = new Audio('../sounds/Mario-jump-sound.mp3'); 
jumpSound.load();

const gameOverSound = new Audio('../sounds/game-over-sound2.mp3');
gameOverSound.load();

const backgroundMusic = new Audio('../sounds/aboveground_bgm.ogg');
backgroundMusic.loop = true;  
backgroundMusic.volume = 0.8; 


const jump = () => {
  if (gameRunning && !showingPopup) {
    jumpSound.play();
    mario.classList.add('jump');
    setTimeout(() => {
      mario.classList.remove('jump');
    }, 500);
  }
};

document.addEventListener('keydown', () => {
  if (!backgroundMusic.playing) {
    backgroundMusic.play();
  }
});

pipe.style.animation = 'none';

setInterval(() => {
  if (gameRunning) {
    speed += speedIncrement;
    console.log('Speed increased to:', speed);
  }
}, speedIntervalTime);

const movePipe = () => {
  if (!gameRunning || showingPopup) return;

  currentPosition += speed;

  if (currentPosition >= window.innerWidth) {
    currentPosition = -80;

    showingPopup = true;
    popup.style.display = 'block';

    setTimeout(() => {
      if (showingPopup) {
        closePopup();
      }
    }, 400000);
  }

  pipe.style.right = `${currentPosition}px`;
  requestAnimationFrame(movePipe);
};

const closePopup = () => {
  showingPopup = false;
  popup.style.display = 'none';
  requestAnimationFrame(movePipe);
};

nextBtn.addEventListener('click', closePopup);

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
  const cloudsPosition = +window.getComputedStyle(clouds).left.replace('px', '');

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    gameRunning = false;

    gameOverSound.play();

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    clouds.style.animation = 'none';
    clouds.style.left = `${cloudsPosition}px`;

    mario.src = "images/game-over.png";
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';

    gameOver.textContent = "Game over";

    clearInterval(loop);

    backgroundMusic.pause();

    summaryScreen.style.display = 'block';
  }
}, 10);

restartBtn.addEventListener('click', () => {
  window.location.href = 'questions.html';
});

requestAnimationFrame(movePipe);

document.addEventListener('keydown', jump);