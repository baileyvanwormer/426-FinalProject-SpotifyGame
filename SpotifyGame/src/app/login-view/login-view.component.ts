import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent {
  constructor(private service: GameService) {}

  public handleSubmit(username: string) {
    this.service.setUsername(username);
    this.service.setState('menu');
  }

  public getUsername() {
    return this.service.getUsername();
  }

  public getUsers() {
    return this.service.getUsers();
  }

  public addUser(username: string) {
    this.service.addUser(username);
  }
}
