const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const resetBtn = document.getElementById('reset-btn');

let turn = 'X';
let gameOver = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const cellA = cells[condition[0]].textContent;
        const cellB = cells[condition[1]].textContent;
        const cellC = cells[condition[2]].textContent;

        if (cellA === cellB && cellB === cellC && cellA !== '') {
            gameOver = true;
            message.textContent = `Player ${cellA} Wins!`;
            return;
        }
    }

    // Check for a tie (all cells filled)
    let isTie = true;
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === '') {
            isTie = false;
            break;
        }
    }

    if (isTie) {
        gameOver = true;
        message.textContent = "It's a Tie!";
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.dataset.cell, 10);

    if (cell.textContent !== '' || gameOver) {
        return;
    }

    cell.textContent = turn;
    checkWinner();

    if (!gameOver) {
        turn = turn === 'X' ? 'O' : 'X';
        message.textContent = `Turn: Player ${turn}`;
    }
}

function resetGame() {
    cells.forEach(cell => cell.textContent = '');
    turn = 'X';
    gameOver = false;
    message.textContent = `Turn: Player ${turn}`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
