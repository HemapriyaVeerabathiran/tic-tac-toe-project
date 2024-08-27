// script.js
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWin = () => {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        isGameActive = false;
    } else if (!board.includes('')) {
        statusText.textContent = `It's a tie!`;
        isGameActive = false;
    }
};

const aiMove = () => {
    if (!isGameActive) return;
    let availableMoves = [];
    board.forEach((cell, index) => {
        if (cell === '') availableMoves.push(index);
    });

    if (availableMoves.length > 0) {
        let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        board[move] = 'O';
        cells[move].textContent = 'O';
        checkWin();
        currentPlayer = 'X';
    }
};

const handleCellClick = (e) => {
    const cellIndex = Array.from(cells).indexOf(e.target);

    if (board[cellIndex] !== '' || !isGameActive) return;

    board[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;
    checkWin();

    if (isGameActive && currentPlayer === 'X') {
        currentPlayer = 'O';
        setTimeout(aiMove, 500); // AI move after a short delay
    }
};

const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    isGameActive = true;
    statusText.textContent = 'Player X\'s turn';
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
