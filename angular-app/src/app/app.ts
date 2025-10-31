import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserManager } from './components/user-manager/user-manager';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserManager],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Angular + API Demo');
}
