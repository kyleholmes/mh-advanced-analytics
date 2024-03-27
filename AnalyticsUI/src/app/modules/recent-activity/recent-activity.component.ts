import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { Subscription, filter, skip } from 'rxjs';
import { SimpleCount } from 'src/app/models/simple-count';
import { User } from 'src/app/models/user';
import { ClearUserDetail, GetAllUsers, GetDeviceTypes, GetPowerUsers, GetScreenSizes, GetUser, GetUserActivity, GetUserErrors, SetPageTitle } from 'src/app/store/analytics.actions';
import { AnalyticsState } from 'src/app/store/analytics.reducer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Error } from 'src/app/models/error';
import { Activity } from 'src/app/models/activity';

@Component({
  selector: 'recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrl: './recent-activity.component.css'
})
export class RecentActivityComponent {
  private subscriptions = new Subscription();
  currentUser!: User;
  currentUserID!: string;
  userActivityList: Activity[] = [
    { timeStamp: '2024-03-01 8:00am', action: '', eventInfo: 'Log In', page: '' },
    { timeStamp: '2024-03-01 8:05am', action: '', eventInfo: 'Loads Dispense Fee Dashboard', page: '' },
    { timeStamp: '2024-03-01 9:00am', action: '', eventInfo: 'Checks Qualification Filters', page: '' },
    { timeStamp: '2024-03-01 11:00am', action: '', eventInfo: 'Logs Out', page: '' },
  ];
  
  constructor(
    public store: Store<{ analyticsState: AnalyticsState }>,
    private route: ActivatedRoute, private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      this.currentUserID = params.get('id')!;
    });
    this.store.dispatch(GetUser({ uid: this.currentUserID }));
  }
  
  ngOnInit(): void {
    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.currentUser)
        .pipe(filter((currentUser) => currentUser !== null))
        .subscribe((currentUser) => {
          this.currentUser = currentUser;
          this.store.dispatch(SetPageTitle({ title: this.currentUser.firstName + ' ' + this.currentUser.lastName + ' Average Day' }));
        })
    );
  }

  back() {
    this.router.navigate(['/user-detail', this.currentUser.uid]);
  }

  public ngOnDestroy() {
    this.store.dispatch(ClearUserDetail());
    this.subscriptions.unsubscribe();
  }
}
