import { catchError, map, switchMap } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of as observableOf } from 'rxjs';
import { GetAllLoadTimes, GetAllLoadTimesError, GetAllLoadTimesResults, GetAllPages, GetAllPagesError, GetAllPagesResults, GetAllUsers, GetAllUsersError, GetAllUsersResults, GetBrowserActivity, GetBrowserActivityError, GetBrowserActivityResults, GetDeviceTypes, GetDeviceTypesError, GetDeviceTypesResults, GetErrorDetail, GetErrorDetailError, GetErrorDetailResults, GetLastWeekErrors, GetLastWeekErrorsError, GetLastWeekErrorsFull, GetLastWeekErrorsFullError, GetLastWeekErrorsFullResults, GetLastWeekErrorsResults, GetPage, GetPageActivity, GetPageActivityError, GetPageActivityResults, GetPageAverageLoadTime, GetPageAverageLoadTimeError, GetPageAverageLoadTimeResults, GetPageError, GetPageErrors, GetPageErrorsError, GetPageErrorsResults, GetPageFavoritedBy, GetPageFavoritedByError, GetPageFavoritedByResults, GetPageLoads, GetPageLoadsError, GetPageLoadsResults, GetPageResults, GetPowerUsers, GetPowerUsersError, GetPowerUsersResults, GetScreenSizes, GetScreenSizesError, GetScreenSizesResults, GetUser, GetUserActivity, GetUserActivityError, GetUserActivityResults, GetUserError, GetUserErrors, GetUserErrorsError, GetUserErrorsResults, GetUserLogins, GetUserLoginsError, GetUserLoginsResults, GetUserResults } from "./analytics.actions";
import { AnalyticsService } from "../service/analytics.service";

@Injectable()
export class AnalyticsStoreEffects {

  constructor(private analyticsService: AnalyticsService, private actions$: Actions) {
  }

  GetDeviceTypesEffects$ = createEffect(() => this.actions$.pipe(
    ofType(GetDeviceTypes),
    switchMap(action =>
      this.analyticsService.getDeviceTypeList()
        .pipe(
          map(
            data => {
              return GetDeviceTypesResults({ deviceTypeList: data })
            }
          ),
          catchError(
            error => observableOf(GetDeviceTypesError({ message: error }))
          )
        )
    )
  ));

  GetScreenSizesEffects$ = createEffect(() => this.actions$.pipe(
    ofType(GetScreenSizes),
    switchMap(action =>
      this.analyticsService.getScreenSizesList()
        .pipe(
          map(
            data => {
              return GetScreenSizesResults({ screenSizesList: data })
            }
          ),
          catchError(
            error => observableOf(GetScreenSizesError({ message: error }))
          )
        )
    )
  ));

  GetPowerUsersEffects$ = createEffect(() => this.actions$.pipe(
    ofType(GetPowerUsers),
    switchMap(action =>
      this.analyticsService.getPowerUsers()
        .pipe(
          map(
            data => {
              return GetPowerUsersResults({ powerUsers: data })
            }
          ),
          catchError(
            error => observableOf(GetPowerUsersError({ message: error }))
          )
        )
    )
  ));

  GetLastWeekErrorsEffects$ = createEffect(() => this.actions$.pipe(
    ofType(GetLastWeekErrors),
    switchMap(action =>
      this.analyticsService.getLastWeekErrors()
        .pipe(
          map(
            data => {
              return GetLastWeekErrorsResults({ lastWeekErrors: data })
            }
          ),
          catchError(
            error => observableOf(GetLastWeekErrorsError({ message: error }))
          )
        )
    )
  ));

  GetPageLoadsEffects$ = createEffect(() => this.actions$.pipe(
    ofType(GetPageLoads),
    switchMap(action =>
      this.analyticsService.getPageLoadsList()
        .pipe(
          map(
            data => {
              return GetPageLoadsResults({ pageLoads: data })
            }
          ),
          catchError(
            error => observableOf(GetPageLoadsError({ message: error }))
          )
        )
    )
  ));

  GetAllPageLoadTimesEffects$ = createEffect(() => this.actions$.pipe(
    ofType(GetAllLoadTimes),
    switchMap(action =>
      this.analyticsService.getAllPageLoadTimesList()
        .pipe(
          map(
            data => {
              return GetAllLoadTimesResults({ pageLoadTimesList : data })
            }
          ),
          catchError(
            error => observableOf(GetAllLoadTimesError({ message: error }))
          )
        )
    )
  ));

  GetUserLoginsEffects$ = createEffect(() => this.actions$.pipe(
    ofType(GetUserLogins),
    switchMap(action =>
      this.analyticsService.getUserLogins()
        .pipe(
          map(
            data => {
              return GetUserLoginsResults({ userLogins: data })
            }
          ),
          catchError(
            error => observableOf(GetUserLoginsError({ message: error }))
          )
        )
    )
  ));

  GetAllUsersEffects$ = createEffect(() => this.actions$.pipe(
    ofType(GetAllUsers),
    switchMap(action =>
      this.analyticsService.getAllUsers()
        .pipe(
          map(
            data => {
              return GetAllUsersResults({ allUsers: data })
            }
          ),
          catchError(
            error => observableOf(GetAllUsersError({ message: error }))
          )
        )
    )
  ));

  GetAllPagesEffects$ = createEffect(() => this.actions$.pipe(
    ofType(GetAllPages),
    switchMap(action =>
      this.analyticsService.getAllPages()
        .pipe(
          map(
            data => {
              return GetAllPagesResults({ allPages: data })
            }
          ),
          catchError(
            error => observableOf(GetAllPagesError({ message: error }))
          )
        )
    )
  ));

  GetUserEffects$ = createEffect(() => this.actions$.pipe(
    ofType(GetUser),
    switchMap(action =>
      this.analyticsService.getUser(action.uid)
        .pipe(
          map(
            data => {
              return GetUserResults({ user: data })
            }
          ),
          catchError(
            error => observableOf(GetUserError({ message: error }))
          )
        )
    )
  ));

  GetUserErrorsEffects$ = createEffect(() => this.actions$.pipe(
    ofType(GetUserErrors),
    switchMap(action =>
      this.analyticsService.getUserErrors(action.uid)
        .pipe(
          map(
            data => {
              return GetUserErrorsResults({ userErrors: data })
            }
          ),
          catchError(
            error => observableOf(GetUserErrorsError({ message: error }))
          )
        )
    )
  ));

  GetUserActivityEffects$ = createEffect(() => this.actions$.pipe(
    ofType(GetUserActivity),
    switchMap(action =>
      this.analyticsService.getUserActivity(action.uid)
        .pipe(
          map(
            data => {
              return GetUserActivityResults({ userActivity: data })
            }
          ),
          catchError(
            error => observableOf(GetUserActivityError({ message: error }))
          )
        )
    )
  ));

  GetPageEffects$ = createEffect(() => this.actions$.pipe(
    ofType(GetPage),
    switchMap(action =>
      this.analyticsService.getPage(action.pageID)
        .pipe(
          map(
            data => {
              return GetPageResults({ page: data })
            }
          ),
          catchError(
            error => observableOf(GetPageError({ message: error }))
          )
        )
    )
  ));

  GetPageAverageLoadTimeEffects$ = createEffect(() => this.actions$.pipe(
    ofType(GetPageAverageLoadTime),
    switchMap(action =>
      this.analyticsService.getPageAverageLoadTime(action.pageUrl)
        .pipe(
          map(
            data => {
              return GetPageAverageLoadTimeResults({ averageLoadTime: data })
            }
          ),
          catchError(
            error => observableOf(GetPageAverageLoadTimeError({ message: error }))
          )
        )
    )
  ));

  GetPageErrorsEffects$ = createEffect(() => this.actions$.pipe(
    ofType(GetPageErrors),
    switchMap(action =>
      this.analyticsService.getPageErrors(action.pageUrl)
        .pipe(
          map(
            data => {
              return GetPageErrorsResults({ pageErrors: data })
            }
          ),
          catchError(
            error => observableOf(GetPageErrorsError({ message: error }))
          )
        )
    )
  ));

  GetPageActivityEffects$ = createEffect(() => this.actions$.pipe(
    ofType(GetPageActivity),
    switchMap(action =>
      this.analyticsService.getPageActivity(action.pageUrl)
        .pipe(
          map(
            data => {
              return GetPageActivityResults({ pageActivity: data })
            }
          ),
          catchError(
            error => observableOf(GetPageActivityError({ message: error }))
          )
        )
    )
  ));

  GetPageFavoritedByEffects$ = createEffect(() => this.actions$.pipe(
    ofType(GetPageFavoritedBy),
    switchMap(action =>
      this.analyticsService.getPageFavoritedBy(action.pageID)
        .pipe(
          map(
            data => {
              return GetPageFavoritedByResults({ favoritedBy: data })
            }
          ),
          catchError(
            error => observableOf(GetPageFavoritedByError({ message: error }))
          )
        )
    )
  ));

  GetLastWeekErrorsFullEffects$ = createEffect(() => this.actions$.pipe(
    ofType(GetLastWeekErrorsFull),
    switchMap(action =>
      this.analyticsService.getLastWeekErrorsFull()
        .pipe(
          map(
            data => {
              return GetLastWeekErrorsFullResults({ lastWeekErrors: data })
            }
          ),
          catchError(
            error => observableOf(GetLastWeekErrorsFullError({ message: error }))
          )
        )
    )
  ));

  GetErrorDetailEffects$ = createEffect(() => this.actions$.pipe(
    ofType(GetErrorDetail),
    switchMap(action =>
      this.analyticsService.getErrorDetail(action.itemID)
        .pipe(
          map(
            data => {
              return GetErrorDetailResults({ errorDetail: data })
            }
          ),
          catchError(
            error => observableOf(GetErrorDetailError({ message: error }))
          )
        )
    )
  ));

  GetBrowserActivityEffects$ = createEffect(() => this.actions$.pipe(
    ofType(GetBrowserActivity),
    switchMap(action =>
      this.analyticsService.getBrowserActivity()
        .pipe(
          map(
            data => {
              return GetBrowserActivityResults({ browserActivity: data })
            }
          ),
          catchError(
            error => observableOf(GetBrowserActivityError({ message: error }))
          )
        )
    )
  ));
}