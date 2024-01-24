'use strict';

// Variables

let currentScorePlayer0 = 0;
let currentScorePlayer1 = 0;

let totalScorePlayer0 = 0;
let totalScorePlayer1 = 0;

let activePlayer = 'player--0';

// Selecting elements
const totalScore0El = document.querySelector('#score--0');
const totalScore1El = document.querySelector('#score--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdScoreBtn = document.querySelector('.btn--hold');

// Common functions
const resetGame = () => {
  totalScore0El.textContent = totalScorePlayer0;
  totalScore1El.textContent = totalScorePlayer1;
  diceEl.classList.add('hidden');
};

const switchPlayer = () => {
  if (activePlayer === 'player--0') {
    currentScorePlayer0 = 0;
    currentScore0El.textContent = currentScorePlayer0;
    activePlayer = 'player--1';
    player1El.classList.add('player--active');
    player0El.classList.remove('player--active');
  } else {
    currentScorePlayer1 = 0;
    currentScore1El.textContent = currentScorePlayer1;
    activePlayer = 'player--0';
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  }
};

const rollDice = () => {
  const randomNumber = Math.floor(Math.random() * 6) + 1;
  diceEl.src = `dice-${randomNumber}.png`;
  diceEl.classList.remove('hidden');
  if (randomNumber === 1) {
    switchPlayer();
  } else {
    // add points to current score
    if (activePlayer === 'player--0') {
      currentScorePlayer0 += randomNumber;
      currentScore0El.textContent = currentScorePlayer0;
    } else {
      currentScorePlayer1 += randomNumber;
      currentScore1El.textContent = currentScorePlayer1;
    }
  }
};

const holdScore = () => {
  if (activePlayer === 'player--0') {
    totalScorePlayer0 += currentScorePlayer0;
    totalScore0El.textContent = totalScorePlayer0;
  } else {
    totalScorePlayer1 += currentScorePlayer1;
    totalScore1El.textContent = totalScorePlayer1;
  }
  switchPlayer();
};

// Reset game at page reload
resetGame();

// Event listeners
rollDiceBtn.addEventListener('click', rollDice);
holdScoreBtn.addEventListener('click', holdScore);
