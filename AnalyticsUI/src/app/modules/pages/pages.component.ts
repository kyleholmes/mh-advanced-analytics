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
import { ClearPageData, GetAllLoadTimes, GetAllPages, GetPageLoads, SetPageTitle } from 'src/app/store/analytics.actions';
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
  pageLoadTimesList: SimpleCount[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort; 
  displayedColumns: string[] = ['pageID', 'pageName', 'ngPageURL'];
  dataSource: any;
  loading1 = true;
  loading2 = true;
  loading3 = true;

  constructor(public store: Store<{ analyticsState: AnalyticsState }>, private router: Router) {
    
  }

  ngOnInit(): void {
    this.store.dispatch(SetPageTitle({ title: 'Pages' }));
    this.store.dispatch(GetPageLoads());
    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.pageLoadsList)
        .pipe(filter((pageLoadsList) => pageLoadsList !== null))
        .subscribe((pageLoadsList) => {
          if (pageLoadsList.length > 0) {
            this.pageLoadsList = pageLoadsList;
            this.loadPagesChart();
            this.loadPageTrends();
            this.loading1 = false;
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
            this.loading2 = false;
          }
        })
    );

    this.store.dispatch(GetAllLoadTimes());
    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.pageLoadTimesList)
        .pipe(filter((pageLoadTimes) => pageLoadTimes !== null))
        .subscribe((pageLoadTimes) => {
          if (pageLoadTimes.length > 0) {
            this.pageLoadTimesList = pageLoadTimes.slice(0,5);
            this.loadSlowestPages();
            this.loading3 = false;
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

  loadSlowestPages() {
    new Chart(
      <HTMLCanvasElement>document.getElementById('slowestPages'),
      {
        type: 'bar',
        data: {
          labels: this.pageLoadTimesList.map(row => row.variable.replace('Macro Manager - ', '').replace('340B Architect - ', '')),
          datasets: [{
            data: this.pageLoadTimesList.map(row => row.count),
            backgroundColor: [
              this.getLoadTimeColor(this.pageLoadTimesList[0].count, false),
              this.getLoadTimeColor(this.pageLoadTimesList[1].count, false),
              this.getLoadTimeColor(this.pageLoadTimesList[2].count, false),
              this.getLoadTimeColor(this.pageLoadTimesList[3].count, false),
              this.getLoadTimeColor(this.pageLoadTimesList[4].count, false)
            ],
            borderColor: [
              this.getLoadTimeColor(this.pageLoadTimesList[0].count, true),
              this.getLoadTimeColor(this.pageLoadTimesList[1].count, true),
              this.getLoadTimeColor(this.pageLoadTimesList[2].count, true),
              this.getLoadTimeColor(this.pageLoadTimesList[3].count, true),
              this.getLoadTimeColor(this.pageLoadTimesList[4].count, true)
            ],
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              title: {
                display: true,
                text: 'Seconds'
              }
            }
          }
        }
      }
    );
  }

  loadPageTrends() {
    new Chart(
      <HTMLCanvasElement>document.getElementById('pageTrends'),
      {
        type: 'line',
        data: {
          labels: ['Sep','Oct','Nov','Dec','Jan', 'Feb', 'Mar'],
          datasets: [
            {
              label: 'Drug Catalog (+17%)',
              data: [226,253,180,277,278,458,610],
              yAxisID: 'y',
            },
            {
              label: 'NDCA Dashboard (-9%)',
              data: [752,600,650,401,424,212,329],
              yAxisID: 'y',
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          //stacked: false,
          plugins: {
            legend: {
              position: 'chartArea',
              labels: {
                boxWidth: 20
              }
            }
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
            }
          }
        },
      }
    );
  }
  
  getLoadTimeColor(time: number, border: boolean){
    let r = (255 - (255/time));
    let g = 150-(time**2);
    return 'rgba('+r+','+g+', 50' + (border ? ')': ', 0.2)');
  }

  back() {
    this.router.navigate(['/']);
  }

  public ngOnDestroy() {
    this.store.dispatch(ClearPageData());
    this.subscriptions.unsubscribe();
  }
  
}
