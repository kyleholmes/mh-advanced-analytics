import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { Subscription, filter } from 'rxjs';
import { SimpleCount } from 'src/app/models/simple-count';
import { User } from 'src/app/models/user';
import { GetAllUsers, GetDeviceTypes, GetErrorDetail, GetPage, GetPageActivity, GetPageAverageLoadTime, GetPageErrors, GetPageFavoritedBy, GetPowerUsers, GetScreenSizes, GetUser, GetUserActivity, GetUserErrors } from 'src/app/store/analytics.actions';
import { AnalyticsState } from 'src/app/store/analytics.reducer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Error } from 'src/app/models/error';
import { Activity } from 'src/app/models/activity';
import { Page } from 'src/app/models/page';
import { ErrorDetail } from 'src/app/models/error-detail';

@Component({
  selector: 'error-detail',
  templateUrl: './error-detail.component.html',
  styleUrl: './error-detail.component.css'
})
export class ErrorDetailComponent {
  private subscriptions = new Subscription();
  currentError!: ErrorDetail;
  currentErrorID!: string;
  
  constructor(
    public store: Store<{ analyticsState: AnalyticsState }>,
    private route: ActivatedRoute, private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      this.currentErrorID = params.get('id')!;
    });
    this.store.dispatch(GetErrorDetail({ itemID: this.currentErrorID }));
  }
  
  ngOnInit(): void {
    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.errorDetail)
        .pipe(filter((currentError) => currentError !== null))
        .subscribe((currentError) => {
          this.currentError = currentError;
        })
    );
  }

  back() {
    this.router.navigate(['/errors']);
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
