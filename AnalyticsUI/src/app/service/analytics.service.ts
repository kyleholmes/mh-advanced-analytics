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
    return this.http.get('https://localhost:44397/PageViews/GetDeviceTypes').pipe(map((response: any) => response));
  }

  public getScreenSizesList() {
    return this.http.get('https://localhost:44397/PageViews/GetScreenSizes').pipe(map((response: any) => response));
  }

  public getPowerUsers() {
    return this.http.get('https://localhost:44397/Events/GetPowerUsers').pipe(map((response: any) => response));
  }

  public getLastWeekErrors() {
    return this.http.get('https://localhost:44397/Exceptions/GetLastWeekErrors').pipe(map((response: any) => response));
  }

  public getPageLoadsList() {
    return this.http.get('https://localhost:44397/PageViews/GetPageLoads').pipe(map((response: any) => response));
  }

  public getUserLogins() {
    return this.http.get('https://localhost:44397/Events/GetUserLogins').pipe(map((response: any) => response));
  }

  public getAllUsers() {
    return this.http.get('https://localhost:44397/Events/GetAllUsers').pipe(map((response: any) => response));
  }

  public getAllPages() {
    return this.http.get('https://localhost:44397/PageViews/GetAllPages').pipe(map((response: any) => response));
  }
}
