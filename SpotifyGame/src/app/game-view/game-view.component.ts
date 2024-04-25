import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css'
})
export class GameViewComponent {
  public artistName: string = '';
  public songs: any[] = [];
  public errorMessage: string = '';

  constructor(private service: GameService) {}

  public generateSong() {
    this.service.setArtistName(this.artistName);
    this.service.generateSong(this.artistName).subscribe({
      next: (data) => {
        console.log("Song data received:", data);
        this.songs = data.tracks;  // Assuming the data includes an array of tracks
        // Update the UI to display the songs
      },
      error: (error) => {
        console.error("Error fetching song:", error);
        this.errorMessage = "Failed to fetch songs. Please try again.";
        // Update the UI to show an error message
      }
    });
  }

  public setArtistName(artistName: string) {
    this.service.setArtistName(artistName);
  }
}
