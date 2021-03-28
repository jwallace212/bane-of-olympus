const playerAvatar = document.getElementById('player1');
const enemyAvatar = document.getElementById('enemy');
const chooseAttack = document.getElementById('choose-attack');
const moveAlert = document.getElementById('move-alert');
const userAlert = document.getElementById('user-alert');
const enemyAlert = document.getElementById('enemy-alert');

const battleMove = () => {
  headerVisible();
  playerMove();
  setTimeout(function() {enemyMove()}, 3500);
  document.getElementById('attack1').disabled = true;
  setTimeout(function() {resetButton}, 7000);
}

const headerVisible = () => {
  chooseAttack.classList.toggle('hidden');
  setTimeout(function() {chooseAttack.classList.toggle('hidden')}, 7000);
}

const playerMove = () => {
  userAlertToggle();
  enemyAvatar.classList.remove('animate__headShake');
  setTimeout(function() {enemyAvatar.classList.toggle("animate__headShake")}, 1);
}

const userAlertToggle = () => {
  userAlert.classList.toggle('hide');
  userAlert.classList.toggle('animate__zoomIn');
  setTimeout(function() {resetUserAlert()}, 3500);
}

const resetUserAlert = () => {
  userAlert.classList.toggle('animate__zoomIn');
  userAlert.classList.toggle('hide');
}

const enemyMove = () => {
  enemyAlertToggle();
  playerAvatar.classList.remove('animate__headShake');
  setTimeout(function() {playerAvatar.classList.toggle("animate__headShake")}, 1);
}

const enemyAlertToggle = () => {
  enemyAlert.classList.toggle('hide');
  enemyAlert.classList.toggle('animate__zoomIn');
  setTimeout(function() {resetEnemyAlert()}, 3500);
}

const resetEnemyAlert = () => {
  enemyAlert.classList.toggle('hide');
  enemyAlert.classList.toggle('animate__zoomIn');
}

const resetButton = () => {
  document.getElementById('attack1').disabled = false;
}

document.getElementById('attack1').addEventListener('click', battleMove)