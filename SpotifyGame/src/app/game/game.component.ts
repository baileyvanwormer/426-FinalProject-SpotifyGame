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
  currentArtistId = '';
  isGameActive = false;

  constructor(private gameService: GameService) {}

  startGame(artistName: string) {
    this.gameService.setArtistName(artistName);
    this.gameService.fetchArtist(artistName).subscribe(artist => {
      if (artist && artist.length > 0) {
        this.currentArtistId = artist[0].id;
        this.isGameActive = true;
        this.playNextSong();
      }
    });
  }

  playNextSong() {
    this.gameService.fetchSongs(this.currentArtistId).subscribe(songs => {
      if (songs && songs.length > 0) {
        this.currentSongPreviewUrl = songs[0].link; // Load the first song
        // Additional logic to play the song if needed
      }
    });
  }

  verifyAnswer(userGuess: string, correctTitle: string) {
    if (userGuess === correctTitle) {
      this.currentScore++;
      this.playNextSong();
    } else {
      this.endGame();
    }
  }

  endGame() {
    this.isGameActive = false;
    // Logic to handle the end of the game, show final score, update user data
    this.gameService.updateScore(this.gameService.getUsername(), { score: this.currentScore }).subscribe();
  }
}
