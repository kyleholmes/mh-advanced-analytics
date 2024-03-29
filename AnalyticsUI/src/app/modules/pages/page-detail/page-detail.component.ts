import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { Subscription, filter, skip } from 'rxjs';
import { SimpleCount } from 'src/app/models/simple-count';
import { User } from 'src/app/models/user';
import { ClearPageDetail, GetAllUsers, GetDeviceTypes, GetPage, GetPageActivity, GetPageAverageLoadTime, GetPageAverageLoadTimeCleanup, GetPageErrors, GetPageFavoritedBy, GetPowerUsers, GetScreenSizes, GetUser, GetUserActivity, GetUserErrors, SetPageTitle } from 'src/app/store/analytics.actions';
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
  pageErrors!: Error[];
  pageActivityList!: Activity[];
  pageFavoritedBy!: User[];
  loadingRecentErrors = true;
  loadingFavorites = true;
  loadingActivity = true;
  loadingLoadTime = true;
  
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
          this.store.dispatch(SetPageTitle({ title: this.currentPage.pageName + ' Analytics' }));
          this.store.dispatch(GetPageAverageLoadTime({ pageUrl: this.currentPage.pageName }));
          this.store.dispatch(GetPageErrors({ pageUrl: this.currentPage.ngPageURL }));
          this.store.dispatch(GetPageActivity({ pageUrl: this.currentPage.pageName }));
          this.store.dispatch(GetPageFavoritedBy({ pageID: this.currentPage.pageID?.toString() }));
        })
    );

    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.pageAverageLoadTime)
        .pipe(skip(1), filter((pageAverageLoadTime) => pageAverageLoadTime !== null))
        .subscribe((pageAverageLoadTime) => {
          this.pageAverageLoadTime = pageAverageLoadTime;
          this.loadingLoadTime = false;
        })
    );

    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.pageErrors)
        .pipe(skip(1), filter((pageErrors) => pageErrors !== [] as Error[]))
        .subscribe((pageErrors) => {
          this.pageErrors = pageErrors;
          this.loadingRecentErrors = false;
        })
    );

    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.pageActivityList)
        .pipe(skip(1), filter((pageActivityList) => pageActivityList !== null))
        .subscribe((pageActivityList) => {
          this.pageActivityList = pageActivityList;
          this.loadingActivity = false;
        })
    );

    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.pageFavoritedBy)
        .pipe(skip(1), filter((pageFavoritedBy) => pageFavoritedBy !== null))
        .subscribe((pageFavoritedBy) => {
          this.pageFavoritedBy = pageFavoritedBy;
          this.loadingFavorites = false;
        })
    );
  }

  openError(error: Error) {
    this.router.navigate(['/error-detail', error.itemID]);
  }

  openUserDetail(user: User) {
    this.router.navigate(['/user-detail', user.uid]);
  }

  back() {
    this.router.navigate(['/pages']);
  }

  public ngOnDestroy() {
    this.store.dispatch(GetPageAverageLoadTimeCleanup());
    this.store.dispatch(ClearPageDetail());
    this.subscriptions.unsubscribe();
  }
}
