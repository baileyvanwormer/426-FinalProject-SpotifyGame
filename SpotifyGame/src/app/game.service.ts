import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private username: string = '';
  private state: string = 'login';
  private artistName: string = '';
  private artistID: number = 0;
  private songName: string = '';
  private score: number = 0;
  private songURL: string = '';
  

  constructor(private http: HttpClient) { }

  public fetchArtist(artistName: string): Observable<any> {
    return this.http.get(`http://localhost:3000/artist/${artistName}`);
  }

  public fetchSongs(artistId: number): Observable<any> {
    return this.http.get(`http://localhost:3000/artist/songs/${artistId}`);
  }

  public updateScore(username: string, score: any): Observable<any> {
    return this.http.put(`http://localhost:3000/user/${username}`, {scores: [{artist: {name:this.getArtistName(), id: this.getArtistID()}, points: [score]}]});
  }

  public createUser(username: string): Observable<any> {
    return this.http.post(`http://localhost:3000/user`, {username: username, scores: []});
  }

  public fetchUser(username: string): Observable<any> {
    return this.http.get(`http://localhost:3000/user/${username}`);
  }

  public setUsername(username: string) {
    this.username = username;
  }

  public setState(state: string) {
    this.state = state;
  }

  public setArtistName(artistName: string) {
    this.artistName = artistName;
  }

  public getUsername() {
    return this.username;
  }

  public getState() {
    return this.state;
  }

  public getArtistName() {
    return this.artistName;
  }

  public setSongName(songName: string) {
    this.songName = songName;
    console.log(this.songName);
  }

  public getSongName() {
    return this.songName;
  }

  public checkSongName(songNameInput: string) {
    if (this.songName == songNameInput) {
      return true;
    } else {
      return false;
    }
  }

  public getScore() {
    return this.score;
  }

  public setScore(score: number) {
    this.score = score;
  }

  public getArtistID() {
    return this.artistID;
  }

  public setArtistID(id: number) {
    this.artistID = id;
  }

  public getSongURL() {
    return this.songURL;
  }

  public setSongURL(url: string) {
    this.songURL = url;
  } 
}
