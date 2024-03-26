import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Chart from 'chart.js/auto';
import { Subscription, filter } from 'rxjs';
import { SimpleCount } from 'src/app/models/simple-count';
import { ClearHomeData, GetLastWeekErrors, GetPageLoads, GetUserLogins } from 'src/app/store/analytics.actions';
import { AnalyticsState } from 'src/app/store/analytics.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  private subscriptions = new Subscription();
  errorByDayList: SimpleCount[] = [];
  pageLoadsList: SimpleCount[] = [];
  userLoginsList: SimpleCount[] = [];
  loading1 = true;
  loading2 = true;
  loading3 = true;

  constructor(private router: Router, public store: Store<{ analyticsState: AnalyticsState }>) {
    
  }

  ngOnInit(): void {
    this.store.dispatch(GetPageLoads());
    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.pageLoadsList)
        .pipe(filter((pageLoadsList) => pageLoadsList !== null))
        .subscribe((pageLoadsList) => {
          if (pageLoadsList.length > 0) {
            this.pageLoadsList = pageLoadsList;
            this.loadPagesChart();
            this.loading1 = false;
          }
        })
    );

    this.store.dispatch(GetUserLogins());
    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.userLoginsList)
        .pipe(filter((userLoginsList) => userLoginsList !== null))
        .subscribe((userLoginsList) => {
          if (userLoginsList.length > 0) {
            this.userLoginsList = userLoginsList;
            this.loadUsersChart();
            this.loading2 = false;
          }
        })
    );

    this.store.dispatch(GetLastWeekErrors());
    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.errorByDayList)
        .pipe(filter((errorByDayList) => errorByDayList !== null))
        .subscribe((errorByDayList) => {
          if (errorByDayList.length > 0) {
            this.errorByDayList = errorByDayList;
            this.loadErrorChart();
            this.loading3 = false;
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
          labels: this.pageLoadsList.map(row => row.variable.split('-')[1]),
          datasets: [
            {
              label: 'Page Views',
              data: this.pageLoadsList.map(row => row.count)
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

  loadUsersChart() {
    new Chart(
      <HTMLCanvasElement>document.getElementById('users'),
      {
        type: 'line',
        data: {
          labels: this.userLoginsList.map(row => row.variable),
          datasets: [
            {
              label: 'User Logins',
              data: this.userLoginsList.map(row => row.count)
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

  public ngOnDestroy() {
    this.store.dispatch(ClearHomeData());
    this.subscriptions.unsubscribe();
  }
  
}
