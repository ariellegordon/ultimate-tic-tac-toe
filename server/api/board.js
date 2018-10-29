class Board {
  constructor(id) {
    this.id = id;
    this.board = [
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '']
    ];
    this.winner = '';
    this.turn = 'X';
    this.valid_subgames = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  }
}

Board.prototype.move = function(player, subgame, cell) {
  const prevTurn = this.turn;
  if (this.valid_subgames.indexOf(+subgame) < 0) {
    throw new Error('Invalid subgame!', typeof subgame);
  } else if (this.board[subgame][cell] !== '') {
    throw new Error('This move is illegal :O!');
  } else {
    this.board[subgame][cell] = player;
    this.turn = prevTurn === 'X' ? 'O' : 'X';
    this.valid_subgames = [+cell];
  }
  return this;
};

const streak = (board, array, player) => {
  for (let i = 0; i < array.length; i++) {
    if (board[array[i]] !== player) {
      return null;
    }
  }
  return player;
};

Board.prototype.checkWin = function(subgame, player) {
  // let player;
  // for (let i = 0; i < subgame.length; i++) {
  //   if (this.board[subgame][i] !== '') {
  //     player = this.board[subgame][i];
  //     break;
  //   }
  // }

  //horizontals
  const horizonal1 = streak(this.board[subgame], [0, 1, 2], player);
  if (horizonal1) {
    return horizonal1;
  }
  const horizontal2 = streak(this.board[subgame], [3, 4, 5], player);
  if (horizontal2) {
    return horizontal2;
  }
  const horizonal3 = streak(this.board[subgame], [6, 7, 8], player);
  if (horizonal3) {
    return horizonal3;
  }
  //verticals
  const vertical1 = streak(this.board[subgame], [0, 3, 6], player);
  if (vertical1) {
    return vertical1;
  }
  const vertical2 = streak(this.board[subgame], [1, 4, 7], player);
  if (vertical2) {
    return vertical2;
  }
  const vertical3 = streak(this.board[subgame], [2, 5, 8], player);
  if (vertical3) {
    return vertical3;
  }
  //diags
  const diag1 = streak(this.board[subgame], [0, 4, 8], player);
  if (diag1) {
    return diag1;
  }
  const diag2 = streak(this.board[subgame], [2, 4, 6], player);
  if (diag2) {
    return diag2;
  }
  return this;
};

module.exports = Board;
