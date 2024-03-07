import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Router, RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    RouterModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showMenu = false;

  constructor(private router: Router) {
    
  }

  goHome() {
    this.router.navigate(['/']);
    this.toggleMenu();
  }

  openPages() {
    this.router.navigate(['/pages']);
    this.toggleMenu();
  }

  openUsers() {
    this.router.navigate(['/users']);
    this.toggleMenu();
  }

  openErrors() {
    this.router.navigate(['/errors']);
    this.toggleMenu();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
