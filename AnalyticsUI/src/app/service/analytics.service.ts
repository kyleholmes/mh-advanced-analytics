import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import { AnalyticsState } from "../store/analytics.reducer";
@Injectable({
  providedIn: 'root'
})

export class AnalyticsService {

  constructor(protected http: HttpClient, protected store: Store<{ analyticsState: AnalyticsState }>) {
    
  }

  public getDeviceTypeList() {
    return this.http
      .get('https://localhost:44397/Analytics/GetDeviceTypes')
      .pipe(
        map((response: any) => response)
      );
  }
}
