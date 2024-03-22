import { catchError, map, switchMap } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of as observableOf } from 'rxjs';
import { GetAllPages, GetAllPagesError, GetAllPagesResults, GetAllUsers, GetAllUsersError, GetAllUsersResults, GetDeviceTypes, GetDeviceTypesError, GetDeviceTypesResults, GetLastWeekErrors, GetLastWeekErrorsError, GetLastWeekErrorsResults, GetPage, GetPageAverageLoadTime, GetPageAverageLoadTimeError, GetPageAverageLoadTimeResults, GetPageError, GetPageLoads, GetPageLoadsError, GetPageLoadsResults, GetPageResults, GetPowerUsers, GetPowerUsersError, GetPowerUsersResults, GetScreenSizes, GetScreenSizesError, GetScreenSizesResults, GetUser, GetUserActivity, GetUserActivityError, GetUserActivityResults, GetUserError, GetUserErrors, GetUserErrorsError, GetUserErrorsResults, GetUserLogins, GetUserLoginsError, GetUserLoginsResults, GetUserResults } from "./analytics.actions";
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
}