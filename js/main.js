const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const countdownNum = document.querySelector('#countdown');
const molecount = document.querySelector('.molecount');
const moles = document.querySelectorAll('.mole');
const button = document.querySelector('#start');
let lastHole;
let timeUp = false;
let score = 0;
let count = 0;
let timeleft = 15;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        console.log('Same one');
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(500, 1500);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    molecount.textContent = 0;
    timeUp = false;
    score = 0;
    count = 0;
    timeleft = 15;
    button.style.visibility = 'hidden';
    peep();
    setTimeout(() => {
        timeUp = true;
        button.innerHTML = '<img src="./img/playagain.png" alt="Play Again" style="height: 60px;">'
        button.style.visibility = 'visible';
    }, 15000);
    countdownTimer();
}

function countdownTimer() {
    var timer = setInterval(function () {
        timeleft--;
        countdownNum.textContent = timeleft;
        if (timeleft <= 0)
            clearInterval(timer);
    }, 1000);
}

function bonk(e) {
    if (!e.isTrusted) return;
    score += 3;
    count++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
    molecount.textContent = count;
    // button.innerHTML = '<img src="./img/playagain.png" class="mole" style="height: 60px; width: 140px;">'
    // button.style.visibility = 'visible';
}

moles.forEach(mole => mole.addEventListener('click', bonk));