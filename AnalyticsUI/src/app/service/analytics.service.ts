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

  public getAllPageLoadTimesList() {
    return this.http.get('https://localhost:44397/PageViews/GetAllLoadTimes').pipe(map((response: any) => response));
  }

  public getUserLogins() {
    return this.http.get('https://localhost:44397/Events/GetUserLogins').pipe(map((response: any) => response));
  }

  public getAllUsers() {
    return this.http.get('https://localhost:44397/Users/GetAllUsers').pipe(map((response: any) => response));
  }

  public getAllPages() {
    return this.http.get('https://localhost:44397/PageViews/GetAllPages').pipe(map((response: any) => response));
  }

  public getUser(uid: string) {
    return this.http.get('https://localhost:44397/Users/GetUser?UID=' + uid).pipe(map((response: any) => response));
  }

  public getUserErrors(uid: string) {
    return this.http.get('https://localhost:44397/Exceptions/GetUserErrors?UID=' + uid).pipe(map((response: any) => response));
  }

  public getUserActivity(uid: string) {
    return this.http.get('https://localhost:44397/Events/GetUserActivity?UID=' + uid).pipe(map((response: any) => response));
  }

  public getPage(pageID: string) {
    return this.http.get('https://localhost:44397/PageViews/GetPageByPageID?PageID=' + pageID).pipe(map((response: any) => response));
  }

  public getPageAverageLoadTime(pageUrl: string) {
    return this.http.get('https://localhost:44397/PageViews/GetPageAverageLoadTime?PageURL=' + pageUrl).pipe(map((response: any) => response));
  }

  public getPageErrors(pageUrl: string) {
    return this.http.get('https://localhost:44397/Exceptions/GetPageErrors?PageUrl=' + pageUrl).pipe(map((response: any) => response));
  }

  public getPageActivity(pageUrl: string) {
    return this.http.get('https://localhost:44397/Events/GetPageActivity?PageUrl=' + pageUrl).pipe(map((response: any) => response));
  }

  public getPageFavoritedBy(pageID: string) {
    return this.http.get('https://localhost:44397/PageViews/GetPageFavoritedBy?PageID=' + pageID).pipe(map((response: any) => response));
  }

  public getLastWeekErrorsFull() {
    return this.http.get('https://localhost:44397/Exceptions/GetLastWeekErrorsFull').pipe(map((response: any) => response));
  }

  public getErrorDetail(itemID: string) {
    return this.http.get('https://localhost:44397/Exceptions/GetErrorDetails?ItemID=' + itemID).pipe(map((response: any) => response));
  }
}
