import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Chart from 'chart.js/auto';
import { Subscription, filter } from 'rxjs';
import { SimpleCount } from 'src/app/models/simple-count';
import { GetLastWeekErrors, GetPageLoads } from 'src/app/store/analytics.actions';
import { AnalyticsState } from 'src/app/store/analytics.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  usersData = [
    { day: 'Monday', count: 10 },
    { day: 'Tuesday', count: 20 },
    { day: 'Wednesday', count: 15 },
    { day: 'Thursday', count: 25 },
    { day: 'Friday', count: 22 },
    { day: 'Saturday', count: 30 },
    { day: 'Sunday', count: 30 },
  ];

  private subscriptions = new Subscription();
  errorByDayList: SimpleCount[] = [];
  pageLoadsList: SimpleCount[] = [];

  constructor(private router: Router, public store: Store<{ analyticsState: AnalyticsState }>) {
    
  }

  ngOnInit(): void {
    this.loadUsersChart();

    this.store.dispatch(GetLastWeekErrors());
    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.errorByDayList)
        .pipe(filter((errorByDayList) => errorByDayList !== null))
        .subscribe((errorByDayList) => {
          if (errorByDayList.length > 0) {
            this.errorByDayList = errorByDayList;
            this.loadErrorChart();
          }
        })
    );

    this.store.dispatch(GetPageLoads());
    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.pageLoadsList)
        .pipe(filter((pageLoadsList) => pageLoadsList !== null))
        .subscribe((pageLoadsList) => {
          if (pageLoadsList.length > 0) {
            this.pageLoadsList = pageLoadsList;
            this.loadPagesChart();
          }
        })
    );
  }

  loadPagesChart() {
    new Chart(
      <HTMLCanvasElement>document.getElementById('pages'),
      {
        type: 'doughnut',
        data: {
          labels: this.pageLoadsList.map(row => row.variable),
          datasets: [
            {
              label: 'Page Views',
              data: this.pageLoadsList.map(row => row.count)
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

  loadUsersChart() {
    new Chart(
      <HTMLCanvasElement>document.getElementById('users'),
      {
        type: 'line',
        data: {
          labels: this.usersData.map(row => row.day),
          datasets: [
            {
              label: 'User Count',
              data: this.usersData.map(row => row.count)
            }
          ]
        }
      }
    );
  }

  loadErrorChart() {
    new Chart(
      <HTMLCanvasElement>document.getElementById('errors'),
      {
        type: 'bar',
        data: {
          labels: this.errorByDayList.map(row => row.variable),
          datasets: [
            {
              label: 'Error Count',
              data: this.errorByDayList.map(row => row.count),
              backgroundColor: '#DC3545',
            }
          ]
        }
      }
    );
  }

  openPages() {
    this.router.navigate(['/pages']);
  }

  openUsers() {
    this.router.navigate(['/users']);
  }

  openErrors() {
    this.router.navigate(['/errors']);
  }
  
}
