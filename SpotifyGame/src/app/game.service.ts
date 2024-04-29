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
  private users: Map<string, number>;

  constructor(private http: HttpClient) { 
    this.users = new Map<string, number>();
  }

  public fetchArtist(artistName: string): Observable<any> {
    return this.http.get(`http://localhost:3000/artist/${artistName}`);
  }

  public fetchSongs(artistId: number): Observable<any> {
    return this.http.get(`http://localhost:3000/artist/songs/${artistId}`);
  }

  public updateScore(username: string, score: any): Observable<any> {
    return this.http.put(`http://ocalhost:3000/user/${username}`, score);
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

  public getUsers() {
    return this.users;
  }

  public getUserScore(username: string) {
    return this.users.get(username);
  }

  public addUser(username: string) {
    this.users.set(username, 0);
  }

  public updateUserScore(username: string, score: number) {
    this.users.set(username, score);
  }
}
