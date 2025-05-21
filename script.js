const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const toggleModeBtn = document.getElementById('toggleModeBtn');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;
let vsComputer = false;

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

function checkWin(player) {
  return winningCombinations.some(combination => 
    combination.every(index => board[index] === player)
  );
}

function checkDraw() {
  return board.every(cell => cell !== null);
}

function updateStatus(message) {
  statusDiv.textContent = message;
}

function makeMove(index) {
  if (!gameActive || board[index] !== null) return;

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    updateStatus(`Player ${currentPlayer} wins!`);
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    updateStatus("It's a draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus(`Player ${currentPlayer}'s turn`);

  if (vsComputer && currentPlayer === 'O' && gameActive) {
    computerMove();
  }
}

function computerMove() {
  // Simple AI: pick a random empty cell
  let emptyIndices = board
    .map((val, idx) => val === null ? idx : null)
    .filter(val => val !== null);

  if (emptyIndices.length === 0) return;

  // For better AI, implement minimax or other algorithm here
  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

  setTimeout(() => {
    makeMove(randomIndex);
  }, 500);
}

function restartGame() {
  board.fill(null);
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  updateStatus(`Player ${currentPlayer}'s turn`);
}

function toggleMode() {
  vsComputer = !vsComputer;
  toggleModeBtn.textContent = vsComputer ? 'Play vs Human' : 'Play vs Computer';
  restartGame();
}

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    makeMove(parseInt(cell.dataset.index));
  });
});

restartBtn.addEventListener('click', restartGame);
toggleModeBtn.addEventListener('click', toggleMode);
