//your JS code here. If required.
// grab elements
const submitBtn = document.getElementById('submit');
const msgDiv     = document.querySelector('.message');
const boardDiv   = document.querySelector('.board');

let players   = ['', ''];
let current   = 0;                    // 0 => player1 (X), 1 => player2 (O)
let boardState = Array(9).fill(null); // keep track of X/O or null

// all 8 winning triplets (0-8 indexing)
const wins = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// start the game when names entered
submitBtn.addEventListener('click', startGame);

function startGame() {
  const p1 = document.getElementById('player-1').value.trim();
  const p2 = document.getElementById('player-2').value.trim();
  if (!p1 || !p2) {
    alert('Please enter both player names!');
    return;
  }

  players = [p1, p2];
  document.querySelector('.setup').style.display = 'none';
  renderBoard();
  updateMessage();
}

function renderBoard() {
  boardDiv.innerHTML = '';          // clear any previous
  boardState.fill(null);
  current = 0;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.id = (i + 1).toString();
    cell.className = 'cell';
    cell.addEventListener('click', handleMove);
    boardDiv.appendChild(cell);
  }
}

function updateMessage(text) {
  if (text) {
    msgDiv.textContent = text;
  } else {
    msgDiv.textContent = `${players[current]}, you're up`;
  }
}

function handleMove(e) {
  const idx = parseInt(e.target.id, 10) - 1;
  if (boardState[idx]) return;      // already played

  const mark = current === 0 ? 'X' : 'O';
  boardState[idx] = mark;
  e.target.textContent = mark;
  e.target.classList.add('disabled');

  // check for a winner
  const winningLine = wins.find(line =>
    line.every(i => boardState[i] === mark)
  );

  if (winningLine) {
    // highlight
    winningLine.forEach(i => {
      const cell = document.getElementById((i + 1).toString());
      cell.classList.add('winner');
    });
    updateMessage(`${players[current]}, congratulations you won!`);
    // disable all remaining cells
    document.querySelectorAll('.cell').forEach(c => c.classList.add('disabled'));
    return;
  }

  // check for draw
  if (boardState.every(v => v !== null)) {
    updateMessage(`It's a draw!`);
    return;
  }

  // switch turn
  current = 1 - current;
  updateMessage();
}
