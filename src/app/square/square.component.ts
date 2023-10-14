import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../common/game.service';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css'],
})
export class SquareComponent implements OnInit {
  constructor(public gameService: GameService) {}

  @Input() square: any;

  ngOnInit(): void {}

  changePlayer() {
    this.gameService.isGameRunning = true;

    if (this.gameService.isGameRunning && this.square.state === null) {
      this.square.state = this.gameService.activePlayer;
      this.gameService.changePlayerTurn(this.square);
    }
  }
}
