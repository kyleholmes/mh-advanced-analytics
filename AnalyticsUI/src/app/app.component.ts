import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
  
export class AppComponent {
  showMenu = false;

  constructor(private router: Router) {
    
  }

  goHome() {
    this.router.navigate(['/']);
    this.showMenu = false;
  }

  openPages() {
    this.router.navigate(['/pages']);
    this.showMenu = false;
  }

  openUsers() {
    this.router.navigate(['/users']);
    this.showMenu = false;
  }

  openUserDetail() {
    this.router.navigate(['/user-detail']);
    this.showMenu = false;
  }

  openErrors() {
    this.router.navigate(['/errors']);
    this.showMenu = false;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
