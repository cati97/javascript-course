'use strict';

// Variables

let currentScorePlayer0 = 0;
let currentScorePlayer1 = 0;

let mainScorePlayer0 = 0;
let mainScorePlayer1 = 0;

let activePlayer = 'player--0';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const diceEl = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

// Common functions
const resetGame = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
};

const rollDice = () => {
  const randomNumber = Math.floor(Math.random() * 6) + 1;
  diceEl.src = `dice-${randomNumber}.png`;
  diceEl.classList.remove('hidden');
  if (randomNumber === 1) {
    // switch player
    if (activePlayer === 'player--0') {
      activePlayer = 'player--1';
      player1El.classList.add('player--active');
      player0El.classList.remove('player--active');
    } else {
      activePlayer = 'player--0';
      player0El.classList.add('player--active');
      player1El.classList.remove('player--active');
    }
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

// Reset game at page reload
resetGame();

// Event listeners
rollDiceBtn.addEventListener('click', rollDice);
