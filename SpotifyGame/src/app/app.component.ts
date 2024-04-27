import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SpotifyGame';

  constructor(private service: GameService) {}

  public getState() {
    return this.service.getState();
  }
}
