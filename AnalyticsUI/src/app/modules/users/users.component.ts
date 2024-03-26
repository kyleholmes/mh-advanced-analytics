import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { Subscription, filter } from 'rxjs';
import { SimpleCount } from 'src/app/models/simple-count';
import { User } from 'src/app/models/user';
import { ClearUserData, GetAllUsers, GetDeviceTypes, GetPowerUsers, GetScreenSizes } from 'src/app/store/analytics.actions';
import { AnalyticsState } from 'src/app/store/analytics.reducer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort; 
  displayedColumns: string[] = ['uid', 'firstName', 'lastName', 'lastLogin'];
  dataSource: any;
  private subscriptions = new Subscription();
  screenSizeList: SimpleCount[] = [];
  powerUserList: SimpleCount[] = [];
  allUsersList: User[] = [];
  loading1 = true;
  loading2 = true;
  loading3 = true;
  loading4 = true;
  
  constructor(public store: Store<{ analyticsState: AnalyticsState }>, private router: Router) {
  }
  
  ngOnInit(): void {
    this.store.dispatch(GetScreenSizes());
    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.screenSizeList)
        .pipe(filter((screenSizeList) => screenSizeList !== null))
        .subscribe((screenSizeList) => {
          if (screenSizeList.length > 0) {
            this.screenSizeList = screenSizeList;
            this.loadScreenSizeChart();
            this.loading2 = false;
          }
        })
    );

    this.store.dispatch(GetPowerUsers());
    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.powerUserList)
        .pipe(filter((powerUserList) => powerUserList !== null))
        .subscribe((powerUserList) => {
          if (powerUserList.length > 0) {
            this.powerUserList = powerUserList;
            this.loadPowerUserChart();
            this.loading3 = false;
          }
        })
    );

    this.store.dispatch(GetAllUsers());
    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.allUsersList)
        .pipe(filter((allUsersList) => allUsersList !== null))
        .subscribe((allUsersList) => {
          if (allUsersList.length > 0) {
            this.allUsersList = allUsersList;
            this.loadAllUsersTable();
            this.loading4 = false;
          }
        })
    );

    const citymap = [
      {
        center: { lat: 33.7488, lng: -84.3877 },
        population: 12714856,
      },
      {
        center: { lat: 32.7767, lng: -96.7970 },
        population: 8405837,
      },
    ];

    const mapElement = document.getElementById("map");
    if (mapElement) {
      const map = new google.maps.Map(mapElement, {
        zoom: 3,
        center: { lat: 37.09, lng: -95.712 },
        mapTypeId: "terrain",
        disableDefaultUI: true,
      });

      for (const city in citymap) {
        const cityCircle = new google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          map,
          center: citymap[city].center,
          radius: Math.sqrt(citymap[city].population) * 100,
        });
      }
      this.loading1 = false;
    }
  }

  openUserDetail(selectedRow: User) {
    this.router.navigate(['/user-detail', selectedRow.uid]);
  }

  loadAllUsersTable() {
    this.dataSource = new MatTableDataSource(this.allUsersList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadScreenSizeChart() {
    new Chart(
      <HTMLCanvasElement>document.getElementById('screenSizes'),
      {
        type: 'doughnut',
        data: {
          labels: this.screenSizeList.map(row => row.variable),
          datasets: [
            {
              label: 'Page Loads',
              data: this.screenSizeList.map(row => row.count)
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'left'
            }
          }
        }
      }
    );
  }

  loadPowerUserChart() {
    new Chart(
      <HTMLCanvasElement>document.getElementById('powerUsers'),
      {
        type: 'bar',
        data: {
          labels: this.powerUserList.map(row => row.variable),
          datasets: [
            {
              label: 'User Actions',
              data: this.powerUserList.map(row => row.count)
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      }
    );
  }

  back() {
    this.router.navigate(['/']);
  }

  public ngOnDestroy() {
    this.store.dispatch(ClearUserData());
    this.subscriptions.unsubscribe();
  }
}
