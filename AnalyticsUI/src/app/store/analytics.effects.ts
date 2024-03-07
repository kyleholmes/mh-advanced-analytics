import { catchError, map, switchMap } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of as observableOf } from 'rxjs';
import { GetDeviceTypes, GetDeviceTypesError, GetDeviceTypesResults } from "./analytics.actions";
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
}