import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { ClearErrorData, GetLastWeekErrorsFull, SetPageTitle } from 'src/app/store/analytics.actions';
import { AnalyticsState } from 'src/app/store/analytics.reducer';
import { Error } from 'src/app/models/error';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrl: './errors.component.css'
})
export class ErrorsComponent {
  private subscriptions = new Subscription();
  lastWeekErrorsFull!: Error[];
  loading = true;

  constructor(public store: Store<{ analyticsState: AnalyticsState }>, private router: Router) {
    
  }

  ngOnInit(): void {
    this.store.dispatch(SetPageTitle({ title: 'Errors' }));
    this.store.dispatch(GetLastWeekErrorsFull());
    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.lastWeekErrorsFull)
        .pipe(filter((lastWeekErrorsFull) => lastWeekErrorsFull !== null))
        .subscribe((lastWeekErrorsFull) => {
          if (lastWeekErrorsFull.length > 0) {
            this.lastWeekErrorsFull = lastWeekErrorsFull;
            this.loading = false;
          }
        })
    );
  }

  openError(error: Error) {
    this.router.navigate(['/error-detail', error.itemID]);
  }

  back() {
    this.router.navigate(['/']);
  }

  public ngOnDestroy() {
    this.store.dispatch(ClearErrorData());
    this.subscriptions.unsubscribe();
  }
}
