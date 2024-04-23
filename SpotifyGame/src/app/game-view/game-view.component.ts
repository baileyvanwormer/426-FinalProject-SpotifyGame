import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css'
})
export class GameViewComponent {

  constructor(private service: GameService) {}

  public generateSong() {
    // logic to call service method which calls previews api and generates song goes here
  }

  public setArtistName(artistName: string) {
    this.service.setArtistName(artistName);
  }
}
