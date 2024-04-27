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

  constructor(private http: HttpClient) { }

  public fetchArtist(artistName: string): Observable<any> {
    return this.http.get(`/artist/${artistName}`);
  }

  public fetchSongs(artistId: string): Observable<any> {
    return this.http.get(`/artist/songs/${artistId}`);
  }

  public updateScore(username: string, score: any): Observable<any> {
    return this.http.put(`/user/${username}`, score);
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
}
