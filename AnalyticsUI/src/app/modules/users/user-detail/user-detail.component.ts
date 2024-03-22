import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { Subscription, filter } from 'rxjs';
import { SimpleCount } from 'src/app/models/simple-count';
import { User } from 'src/app/models/user';
import { GetAllUsers, GetDeviceTypes, GetPowerUsers, GetScreenSizes, GetUser, GetUserActivity, GetUserErrors } from 'src/app/store/analytics.actions';
import { AnalyticsState } from 'src/app/store/analytics.reducer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Error } from 'src/app/models/error';
import { Activity } from 'src/app/models/activity';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort; 
  displayedColumns: string[] = ['uid', 'firstName', 'lastName', 'lastLogin'];
  dataSource: any;
  private subscriptions = new Subscription();
  deviceTypesList: SimpleCount[] = [];
  screenSizeList: SimpleCount[] = [];
  powerUserList: SimpleCount[] = [];
  allUsersList: User[] = [];
  currentUser!: User;
  currentUserID!: string;
  userErrors: Error[] = [];
  userActivityList: Activity[] = [];
  
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
        })
    );

    this.store.dispatch(GetUserErrors({ uid: this.currentUserID }));
    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.userErrors)
        .pipe(filter((userErrors) => userErrors !== null))
        .subscribe((userErrors) => {
          this.userErrors = userErrors;
        })
    );

    this.store.dispatch(GetUserActivity({ uid: this.currentUserID }));
    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.userActivityList)
        .pipe(filter((userActivityList) => userActivityList !== null))
        .subscribe((userActivityList) => {
          this.userActivityList = userActivityList;
        })
    );
  }

  back() {
    this.router.navigate(['/users']);
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
