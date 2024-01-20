'use strict';

const generateRandomNumber = () => Math.trunc(Math.random() * 20) + 1;

let randomNumber = generateRandomNumber();

let score = 20;
let highscore = 0;

const guessInput = document.querySelector('.guess');
const checkBtn = document.querySelector('.check');
const messageBox = document.querySelector('.message');

const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.highscore');
const secretNumberElement = document.querySelector('.number');

const againBtn = document.querySelector('.again');

const body = document.querySelector('body');

const displayMessage = msg => {
  messageBox.textContent = msg;
};

checkBtn.addEventListener('click', () => {
  const guessValue = Number(guessInput.value);
  if (!guessValue) {
    displayMessage('No number!');
  } else if (guessValue === randomNumber) {
    displayMessage('Correct number :)');
    secretNumberElement.textContent = randomNumber;
    if (score > highscore) {
      highscore = score;
      highScoreElement.textContent = highscore;
    }
    body.style.backgroundColor = '#60b347';
    secretNumberElement.style.width = '30rem';
  } else if (guessValue !== randomNumber) {
    displayMessage(guessValue < randomNumber ? 'Too low!' : 'Too high!');
    if (score > 1) {
      score--;
    } else {
      score = 0;
      displayMessage('You lost the game!');
    }
    scoreElement.textContent = score;
  }
});

againBtn.addEventListener('click', () => {
  randomNumber = generateRandomNumber();
  score = 20;
  guessInput.value = '';
  messageBox.textContent = 'Start guessing...';
  scoreElement.textContent = score;
  highScoreElement.textContent = highscore;
  body.style.backgroundColor = '#222';
  secretNumberElement.style.width = '15rem';
  secretNumberElement.textContent = '?';
});
