import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { Subscription, filter } from 'rxjs';
import { SimpleCount } from 'src/app/models/simple-count';
import { User } from 'src/app/models/user';
import { GetAllUsers, GetDeviceTypes, GetPage, GetPageAverageLoadTime, GetPowerUsers, GetScreenSizes, GetUser, GetUserActivity, GetUserErrors } from 'src/app/store/analytics.actions';
import { AnalyticsState } from 'src/app/store/analytics.reducer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Error } from 'src/app/models/error';
import { Activity } from 'src/app/models/activity';
import { Page } from 'src/app/models/page';

@Component({
  selector: 'page-detail',
  templateUrl: './page-detail.component.html',
  styleUrl: './page-detail.component.css'
})
export class PageDetailComponent {
  private subscriptions = new Subscription();
  currentPage!: Page;
  currentPageID!: string;
  pageAverageLoadTime!: string;
  
  constructor(
    public store: Store<{ analyticsState: AnalyticsState }>,
    private route: ActivatedRoute, private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      this.currentPageID = params.get('id')!;
    });
    this.store.dispatch(GetPage({ pageID: this.currentPageID }));
  }
  
  ngOnInit(): void {
    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.currentPage)
        .pipe(filter((currentPage) => currentPage !== null))
        .subscribe((currentPage) => {
          this.currentPage = currentPage;
          this.store.dispatch(GetPageAverageLoadTime({ pageUrl: this.currentPage.ngPageURL }));
        })
    );

    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.pageAverageLoadTime)
        .pipe(filter((pageAverageLoadTime) => pageAverageLoadTime !== null))
        .subscribe((pageAverageLoadTime) => {
          this.pageAverageLoadTime = pageAverageLoadTime;
        })
    );
  }

  back() {
    this.router.navigate(['/pages']);
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
