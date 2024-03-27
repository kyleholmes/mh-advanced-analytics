import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsState } from './store/analytics.reducer';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { SetPageTitle } from './store/analytics.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
  
export class AppComponent {
  private subscriptions = new Subscription();
  showMenu = false;
  currentPageTitle: string = '';

  constructor(private router: Router, public store: Store<{ analyticsState: AnalyticsState }>) {
    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.currentPageTitle)
        .pipe(filter((currentPageTitle) => currentPageTitle !== null))
        .subscribe((currentPageTitle) => {
          this.currentPageTitle = currentPageTitle;
        })
    );
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
