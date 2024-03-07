import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { catchError, map } from "rxjs/operators";
import { DeviceType } from "../models/device-type";
@Injectable({
  providedIn: 'root'
})

export class AnalyticsService {

  constructor(protected http: HttpClient, protected store: Store<{ userState: UserState }>) {
    
  }

  public getChainStoresGroupsList() {
    return this.http
      .get('https://localhost:44387/Analytics/GetDeviceTypes')
      .pipe(
        map((response: any) => response)
      );
  }
}
