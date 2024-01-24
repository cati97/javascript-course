'use strict';

let totalScores, currentScore, activePlayer, playing;

const totalScore0El = document.querySelector('#score--0');
const totalScore1El = document.querySelector('#score--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdScoreBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');

const initGame = () => {
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  totalScore0El.textContent = 0;
  totalScore1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

const switchPlayer = () => {
  // 1. Reset currentScore
  currentScore = 0;
  // 2. Display new reset current score on active player
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  // 3. Switch the active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // 4. Toggle player--active class if it wasn't there - add it, if it was - remove it
  player1El.classList.toggle('player--active');
  player0El.classList.toggle('player--active');
};

const rollDice = () => {
  if (playing) {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    diceEl.src = `dice-${randomNumber}.png`;
    diceEl.classList.remove('hidden');
    if (randomNumber === 1) {
      switchPlayer();
    } else {
      // 1. Add random number to current score
      currentScore += randomNumber;
      // 2. Display new current number in active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
};

const holdScore = () => {
  if (playing) {
    // 1. Add currentScore to totalScore of the activePlayer
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // 2. If totalScore more >= 100 finish game
    if (totalScores[activePlayer] >= 20) {
      // Finish the game

      // a. Reset the current score
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // b. Add player-winner class to the active player to change styling, remove player active class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // c. Set playing to false
      playing = false;

      // d. Hide the dice
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
};

initGame();
rollDiceBtn.addEventListener('click', rollDice);
holdScoreBtn.addEventListener('click', holdScore);
newGameBtn.addEventListener('click', initGame);
