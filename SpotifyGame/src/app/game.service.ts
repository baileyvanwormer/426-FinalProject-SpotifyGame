import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private username: string = "";
  private password: string = "";
  private state: string = "login";
  private artistName: string = "Bailey Van Wormer";

  private baseUrl: string = 'https://api.spotify.com/v1';
  private accessToken: string = ''; // Initially blank, needs to be set after obtaining a token

  constructor(private http: HttpClient) {}

  // Set access token (update to handle token refresh?)
  setAccessToken(token: string) {
    this.accessToken = token;
  }

  public generateSong(artistName: string): Observable<any> {
    const url = `${this.baseUrl}/artists/${encodeURIComponent(artistName)}/top-tracks?country=US`;
    return this.http.get(url, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.accessToken}`
      })
    }).pipe(
      catchError(error => {
        console.error('Error fetching songs:', error);
        return throwError(error);
      })
    );
  }
  
  public getUsername() {
    return this.username;
  }

  public getPassword() {
    return this.password;
  }

  public getState() {
    return this.state;
  }

  public getArtistName() {
    return this.artistName;
  }

  public setUsername(username: string) {
    this.username = username;
  }

  public setPassword(password: string) {
    this.password = password;
  }

  public setState(state: string) {
    this.state = state;
  }

  public setArtistName(artistName: string) {
    this.artistName = artistName;
  }
}
