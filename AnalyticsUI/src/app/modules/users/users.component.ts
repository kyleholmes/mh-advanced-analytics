import { Component } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { Subscription, filter } from 'rxjs';
import { DeviceType } from 'src/app/models/device-type';
import { GetDeviceTypes } from 'src/app/store/analytics.actions';
import { AnalyticsState } from 'src/app/store/analytics.reducer';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  private subscriptions = new Subscription();
  deviceTypesList: DeviceType[] = [];
  
  constructor(
    private actions$: Actions,
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
  }

  loadDeviceTypeChart() {
    new Chart(
      <HTMLCanvasElement>document.getElementById('deviceTypes'),
      {
        type: 'doughnut',
        data: {
          labels: this.deviceTypesList.map(row => row.deviceName),
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
}
