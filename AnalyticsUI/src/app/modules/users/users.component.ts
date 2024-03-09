import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { Subscription, filter } from 'rxjs';
import { SimpleCount } from 'src/app/models/simple-count';
import { GetDeviceTypes, GetPowerUsers, GetScreenSizes } from 'src/app/store/analytics.actions';
import { AnalyticsState } from 'src/app/store/analytics.reducer';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  private subscriptions = new Subscription();
  deviceTypesList: SimpleCount[] = [];
  screenSizeList: SimpleCount[] = [];
  powerUserList: SimpleCount[] = [];
  
  constructor(
    public store: Store<{ analyticsState: AnalyticsState }>
  ) { }
  
  ngOnInit(): void {
    this.store.dispatch(GetDeviceTypes());
    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.deviceTypeList)
        .pipe(filter((deviceTypesList) => deviceTypesList !== null))
        .subscribe((deviceTypesList) => {
          if (deviceTypesList.length > 0) {
            this.deviceTypesList = deviceTypesList;
            this.loadDeviceTypeChart();
          }
        })
    );

    this.store.dispatch(GetScreenSizes());
    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.screenSizeList)
        .pipe(filter((screenSizeList) => screenSizeList !== null))
        .subscribe((screenSizeList) => {
          if (screenSizeList.length > 0) {
            this.screenSizeList = screenSizeList;
            this.loadScreenSizeChart();
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
          }
        })
    );
  }

  loadDeviceTypeChart() {
    new Chart(
      <HTMLCanvasElement>document.getElementById('deviceTypes'),
      {
        type: 'doughnut',
        data: {
          labels: this.deviceTypesList.map(row => row.variable),
          datasets: [
            {
              label: 'Device Types',
              data: this.deviceTypesList.map(row => row.count)
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    );
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
          maintainAspectRatio: false
        }
      }
    );
  }

  loadPowerUserChart() {
    new Chart(
      <HTMLCanvasElement>document.getElementById('powerUsers'),
      {
        type: 'doughnut',
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
          maintainAspectRatio: false
        }
      }
    );
  }
}
