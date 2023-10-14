import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public board: any = [];
  boardSize: number = 9;
  activePlayer: string = 'X';
  turnCount: number = 0;
  isGameRunning: boolean = false;
  isGameOver: boolean = false;
  winner: boolean = false;

  constructor() {
    this.newGame();
  }

  newGame() {
    this.activePlayer = 'X';
    this.turnCount = 0;
    this.isGameRunning = false;
    this.isGameOver = false;
    this.winner = false;
    this.board = this.createBoard();
  }

  createBoard() {
    let board = [];

    for (let i = 0; i < 9; i++) {
      board.push({ id: i, state: null });
    }

    return board;
  }

  get getBoard() {
    return this.board;
  }

  set setBoard(board: any) {
    this.board = [...board];
  }

  changePlayerTurn(squareClicked: any) {
    this.updateBoard(squareClicked);

    if (!this.isGameOver)
      this.activePlayer = this.activePlayer === 'X' ? 'O' : 'X';

    this.turnCount++;
    this.isGameOver = this.isGameOver ? true : false;
  }

  updateBoard(squareClicked: any) {
    this.board[squareClicked.id].state = squareClicked.state;

    if (this.isWinner) {
      this.winner = true;
      this.isGameRunning = false;
      this.isGameOver = true;
    }
  }

  get gameOver(): boolean {
    return this.turnCount > 8 || this.winner ? true : false;
  }

  get isWinner(): boolean {
    return this.checkDiag() ||
      this.checkRows(this.board, 'row') ||
      this.checkRows(this.board, 'col')
      ? true
      : false;
  }

  checkRows(board: any, mode: any) {
    const row = mode === 'row' ? true : false,
      dist = row ? 1 : 3,
      inc = row ? 3 : 1,
      numTimes = row ? 7 : 3;

    for (let i = 0; i < numTimes; i += inc) {
      let firstSquare = board[i].state,
        secondSquare = board[i + dist].state,
        thirdSquare = board[i + dist * 2].state;

      if (firstSquare && secondSquare && thirdSquare) {
        if (firstSquare === secondSquare && secondSquare === thirdSquare)
          return true;
      }
    }

    return false;
  }

  checkDiag() {
    const timesRun = 2,
      midSquare = this.board[4].state;

    for (let i = 0; i <= timesRun; i += 2) {
      let upperCorner = this.board[i].state,
        lowerCorner = this.board[8 - i].state;

      if (midSquare && upperCorner && lowerCorner) {
        if (midSquare === upperCorner && upperCorner === lowerCorner)
          return true;
      }
    }

    return false;
  }
}
