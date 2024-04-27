import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  currentScore = 0;
  currentSongPreviewUrl = '';
  currentSongTitle = '';
  userGuess = '';
  isGameActive = false;

  constructor(private gameService: GameService) {}

  // Start the game by fetching an artist and their songs
  startGame(artistName: string) {
    this.isGameActive = true;
    this.currentScore = 0;
    this.gameService.setArtistName(artistName);
    this.gameService.fetchArtist(artistName).subscribe(artists => {
      if (artists && artists.length > 0) {
        this.fetchSongsForArtist(artists[0].id);
      } else {
        // Handle no artist found
        this.isGameActive = false;
        alert("No artist found with that name. Please try another artist.");
      }
    });
  }

  // Fetch songs for a given artist ID
  fetchSongsForArtist(artistId: string) {
    this.gameService.fetchSongs(artistId).subscribe(songs => {
      if (songs && songs.length > 0) {
        this.playSong(songs[0]);
      } else {
        // Handle no songs found
        this.isGameActive = false;
        alert("No songs found for this artist.");
      }
    });
  }

  // Play a song
  playSong(song: any) {
    this.currentSongPreviewUrl = song.link;
    this.currentSongTitle = song.name;
  }

  // Verify the user's guess
  verifyAnswer() {
    if (this.userGuess.toLowerCase() === this.currentSongTitle.toLowerCase()) {
      this.currentScore++;
      this.fetchSongsForArtist(this.gameService.getArtistName());
    } else {
      this.endGame();
    }
    this.userGuess = '';  // Clear the input after the guess
  }

  endGame() {
    this.isGameActive = false;
    alert(`Game Over! Your final score is ${this.currentScore}`);
    // Optionally update the score to the backend here
    this.gameService.updateScore(this.gameService.getUsername(), { score: this.currentScore }).subscribe();
  }
}