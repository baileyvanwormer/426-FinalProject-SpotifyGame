import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css'
})
export class GameViewComponent {

  private gameState: string = "initial";
  private userGuess: string = '';
  private gameOver: boolean = false;

  constructor(private service: GameService) {}

  public generateSong(artistName: string) {
    // logic to call service method which calls previews api and generates song goes here
    this.service.setArtistName(artistName);
    alert("generate song pressed ");
    this.setGameState('guessing');
    try {
      this.service.fetchArtist(artistName).subscribe(artists => {
        console.log(artists);
        if (artists && artists.length > 0) {
          this.fetchSongsForArtist(artists[0].id);
          this.setArtistName(artists[0].name);
          this.setGameState('guessing');
        } else {
          // handle no artist found
          alert("No artist found with that name. Please try another name.");
        }
      });
    } catch (error) {
      alert("No artist found with that name. Please try another name.");
    }
  }

  public submitGuess(userGuess: string) {
    this.setGameState('guessed');
    this.setUserGuess(userGuess);
    this.verifyAnswer();
  }

  public fetchSongsForArtist(artistID: number) {
    this.service.fetchSongs(artistID).subscribe(songs => {
      console.log(songs);
      if (songs && songs.length > 0) {
        this.playSong(songs[0]);
      } else {
        alert("No soungs found for this artist.");
      }
    })
  }

  public playSong(song: any) {
    this.service.setSongURL(song.link);
    this.service.setSongName(song.name);
  }

  public verifyAnswer() {
    if (this.userGuess.toLowerCase() === this.service.getSongName().toLowerCase()) {
      this.service.setScore(this.service.getScore() + 1);
      alert("Correct! Maybe show score here..., Next song!");
      this.generateSong(this.service.getArtistName());
      this.setGameState('guessing');
      // this.fetchSongsForArtist(this.service.getArtistName())
    } else {
      this.endGame();
    }
    this.userGuess = ''; // Clear the input after the guess;
  }

  public endGame() {
    this.setGameState('end');
    alert('Game Over! Your final score is ...');
    this.service.updateScore(this.service.getUsername(), {
      score: this.service.getScore()
    }).subscribe();
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

  public checkSongName(songNameInput: string) {
    this.service.checkSongName(songNameInput);
  }

  public setUserGuess(userGuess: string) {
    this.userGuess = userGuess;
  }

  public getUserGuess() {
    return this.userGuess;
  }

  public getScore() {
    return this.service.getScore();
  }
}
