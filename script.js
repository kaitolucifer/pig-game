'use strict';

// Selecting elements
const score0Ele = document.querySelector('#score--0');
const score1Ele = document.getElementById('score--1');
const current0Ele = document.getElementById('current--0');
const current1Ele = document.getElementById('current--1');
const player0Ele = document.querySelector('.player--0');
const player1Ele = document.querySelector('.player--1');
const diceEle = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const CurrentScoreElements = [current0Ele, current1Ele];
const scoreElements = [score0Ele, score1Ele];
const playerElements = [player0Ele, player1Ele];

// Starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  diceEle.classList.add('hidden');
  player0Ele.classList.remove('player--winner');
  player0Ele.classList.add('player--active');
  player1Ele.classList.remove('player--winner', 'player--active');

  score0Ele.textContent = 0;
  score1Ele.textContent = 0;
  current0Ele.textContent = 0;
  current1Ele.textContent = 0;

  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];
};

init();

const switchPlayer = function () {
  currentScore = 0;
  CurrentScoreElements[activePlayer].textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Ele.classList.toggle('player--active');
  player1Ele.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (!playing) {
    return;
  }
  // 1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice
  diceEle.classList.remove('hidden');
  diceEle.src = `dice-${dice}.png`;

  // 3. Check for rolled 1: if true, switch to next player
  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;
    CurrentScoreElements[activePlayer].textContent = currentScore;
  } else {
    // Switch to the next player
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (!playing) {
    return;
  }
  // 1. Add current score to active player's score
  scores[activePlayer] += currentScore;
  scoreElements[activePlayer].textContent = scores[activePlayer];

  // 2. Check if player's score is >= 100
  if (scores[activePlayer] >= 100) {
    // Finish the game
    diceEle.classList.add('hidden');
    playing = false;
    playerElements[activePlayer].classList.add('player--winner');
    playerElements[activePlayer].classList.remove('player--active');
  } else {
    // 3. Switch to the next player
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
