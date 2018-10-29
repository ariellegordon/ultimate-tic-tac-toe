const router = require('express').Router();
const fs = require('fs');
const boards = require('./boards.json');
const path = require('path');
const Board = require('./board');

let boardList = fs.readFileSync(path.join(__dirname, 'boards.json'));
let stringBoard = boardList.toString();
let boardData = JSON.parse(stringBoard);

router.post('/', (req, res, next) => {
  let length = boardData.length;
  boardData[length] = new Board(length);
  res.json(boardData);
});

router.post('/move', (req, res, next) => {
  let id = req.query.id;
  let player = req.query.player;
  let subgame = req.query.subgame;
  let cell = req.query.cell;
  let board = boardData[id];
  board.move(player, subgame, cell);
  // let winner = board.checkWin(subgame, player);
  // if (winner) {
  //   res.json(winner);
  // } else {
  res.json(board);
  // }
});

router.get('/', (req, res, next) => {
  let board = boardData[req.query.id];
  if (board === undefined) {
    res.sendStatus(404);
  }
  res.json(board);
});

module.exports = router;
