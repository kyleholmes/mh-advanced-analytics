import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Chart from 'chart.js/auto';
import { Subscription, filter } from 'rxjs';
import { Page } from 'src/app/models/page';
import { SimpleCount } from 'src/app/models/simple-count';
import { User } from 'src/app/models/user';
import { GetAllPages, GetPageLoads } from 'src/app/store/analytics.actions';
import { AnalyticsState } from 'src/app/store/analytics.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})

export class PagesComponent {
  private subscriptions = new Subscription();
  pageLoadsList: SimpleCount[] = [];
  allPagesList: Page[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort; 
  displayedColumns: string[] = ['pageID', 'pageName', 'ngPageURL'];
  dataSource: any;

  constructor(public store: Store<{ analyticsState: AnalyticsState }>, private router: Router) {
    
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
          }
        })
    );

    this.store.dispatch(GetAllPages());
    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.allPagesList)
        .pipe(filter((allPagesList) => allPagesList !== null))
        .subscribe((allPagesList) => {
          if (allPagesList.length > 0) {
            this.allPagesList = allPagesList;
            this.loadAllPagesTable();
          }
        })
    );
  }

  openPageDetail(selectedRow: Page) {
    this.router.navigate(['/page-detail', selectedRow.pageID]);
  }

  loadAllPagesTable() {
    this.dataSource = new MatTableDataSource(this.allPagesList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  back() {
    this.router.navigate(['/']);
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  
}
