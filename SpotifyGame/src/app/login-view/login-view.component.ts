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
    this.service.createUser(username).subscribe();
    console.log("created user");
    this.service.setState('menu');
  }

  public getUsername() {
    return this.service.getUsername();
  }
}
