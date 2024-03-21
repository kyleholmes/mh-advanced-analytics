import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { Subscription, filter } from 'rxjs';
import { SimpleCount } from 'src/app/models/simple-count';
import { User } from 'src/app/models/user';
import { GetAllUsers, GetDeviceTypes, GetPowerUsers, GetScreenSizes } from 'src/app/store/analytics.actions';
import { AnalyticsState } from 'src/app/store/analytics.reducer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';

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
  currentUserID!: number;
  
  constructor(
    public store: Store<{ analyticsState: AnalyticsState }>,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      this.currentUserID = parseInt(params.get('id')!);
    })
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
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  
}
