import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent {
  constructor(private service: GameService) {}

  public handleSubmit(username: string, password: string) {
    this.service.setUsername(username);
    this.service.setPassword(password);
    this.service.setState('menu');
  }

  public getUsername() {
    return this.service.getUsername();
  }

  public getPassword() {
    return this.service.getPassword();
  }
}
