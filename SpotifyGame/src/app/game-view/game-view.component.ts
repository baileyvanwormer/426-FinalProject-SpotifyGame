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
  private i: number = 0;

  constructor(private service: GameService) {}

  public generateSong(artistName: string) {
    // logic to call service method which calls previews api and generates song goes here
    this.service.setArtistName(artistName);
    this.service.fetchArtist(artistName).subscribe(artists => {
      console.log(artists);
      if (artists && artists.length > 0) {
        this.fetchSongsForArtist(artists[0].id);
        this.setArtistName(artists[0].name);
        this.setGameState('guessing');
      } else {
        // handle no artist found
        alert("No artist found with that name. Please check your spelling or try another name.");
      }
    });
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
        this.playSong(songs[this.i]);
      } else {
        alert("No soungs found for this artist.");
      }
    })
  }

  public playSong(song: any) {
    this.service.setSongURL(song.link);
    this.setSongName(song.name);
    console.log(song.name);
    console.log(this.getSongName());
  }

  public verifyAnswer() {
    if (this.userGuess.toLowerCase() === this.service.getSongName().toLowerCase()) {
      this.setScore(this.getScore() + 1);
      alert("Correct! Your score is: " + this.getScore() + ". Next song!");
      this.i += 1;
      this.generateSong(this.getArtistName());
      this.setGameState('guessing');
    } else {
      this.endGame();
    }
    console.log("making user guess empty");
    this.setUserGuess(''); // Clear the input after the guess;
  }

  public endGame() {
    this.setGameState('end');
    this.service.updateScore(this.service.getUsername(), this.service.getScore()).subscribe();
  }

  public getHighestScore() {
    this.service.fetchUser(this.getUsername()).subscribe( user => {
      let points = user.scores.find((score: any)=> score.artist.id === this.service.getArtistID());
      if (!points)
        return this.service.getScore();
      else
        return Math.max(...points);
    }

    )
  }

  public backToMenu() {
    this.setGameState('initial');
    this.service.setState('menu');
    this.i = 0;
    this.setScore(0);
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

  public getSongURL() {
    return this.service.getSongURL();
  }

  public setSongURL(url: string) {
    this.service.setSongURL(url);
  }

  public setScore(score: number) {
    this.service.setScore(score);
  }

  public setSongName(songName: string) {
    this.service.setSongName(songName);
  }

  public getSongName() {
    return this.service.getSongName();
  }

  public getUsername() {
    return this.service.getUsername();
  }
}
