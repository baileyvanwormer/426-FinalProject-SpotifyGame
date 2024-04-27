import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css'
})
export class GameViewComponent {

  private gameState: string = "initial";

  constructor(private service: GameService) {}

  public generateSong(artistName: string) {
    // logic to call service method which calls previews api and generates song goes here
    this.service.setArtistName(artistName);
    this.setGameState('playing');
  }

  public getArtistName() {
    return this.service.getArtistName();
  }

  public getGameState() {
    return this.gameState;
  }

  public setArtistName(artistName: string) {
    this.service.setArtistName(artistName);
  }

  public setGameState(gameState: string) {
    this.gameState = gameState;
  }

}
