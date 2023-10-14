import { Component } from '@angular/core';
import { GameService } from './common/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-tictactoe';

  constructor(public gameService: GameService) {}

  resetGame() {
    this.gameService.newGame();
  }
}
