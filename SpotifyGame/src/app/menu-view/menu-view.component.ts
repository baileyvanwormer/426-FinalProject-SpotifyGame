import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-menu-view',
  templateUrl: './menu-view.component.html',
  styleUrl: './menu-view.component.css'
})
export class MenuViewComponent {

  constructor(private service: GameService) {}

  public startGame() {
    this.service.setState('game');
  }

  public getUsername() {
    return this.service.getUsername();
  }

  public getPassword() {
    return this.service.getPassword();
  }
}
