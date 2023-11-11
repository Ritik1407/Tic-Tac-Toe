const clc = require('cli-color');
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let board = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

const userPlayer = clc.red("O");
const cpuPlayer = clc.yellow("X");


function printBoard() {
  for (let i = 0; i < 3; i++) {
    console.log(board[i].join(" | "));
  }
}

function checkWinner() {
  // Check rows and columns,
  for (let i = 0; i < 3; i++) {
    if (
      (board[i][0] !== " " &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]) ||
      (board[0][i] !== " " &&
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i])
    ) {
      return true;
    }
  }
  // check for diagonals
  if (
    (board[0][0] !== " " &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]) ||
    (board[0][2] !== " " &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0])
  ) {
    return true;
  }

  return false;
}

function isTie() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; i++) {
      if (board[i][j] === " ") {
        return false;
      }
    }
  }
  return true;
}

function getRandomMove() {
  const row = Math.floor(Math.random() * 3);
  const col = Math.floor(Math.random() * 3);
  return { row, col };
}

function cpuMove() {
  const { row, col } = getRandomMove();

  if (board[row][col] === " ") {
    board[row][col] = cpuPlayer;
    if (checkWinner()) {
      printBoard();
      console.log(`You Loss!`);
      readline.close();
    } else if (isTie()) {
      printBoard();
      console.log("board is full and its a tie!");
      readline.close();
    } else {
      playGame();
    }
  } else {
    cpuMove();
  }
}

function playGame() {
  printBoard();

  readline.question(`Hi, make a move : `, (input) => {
    const [row, col] = input.split(" ").map(Number);

    if (row >= 0 && row < 3 && col >= 0 && col < 3 && board[row][col] === " ") {
      board[row][col] = userPlayer;

      if (checkWinner()) {
        printBoard();
        console.log(`You won!`);
        readline.close();
      } else if (isTie()) {
        printBoard();
        console.log("Its a tie!");
        readline.close();
      } else {
        cpuMove();
      }
    } else {
      console.log("Invalid move or no space. Try again.");
      playGame();
    }
  });
}

playGame();
