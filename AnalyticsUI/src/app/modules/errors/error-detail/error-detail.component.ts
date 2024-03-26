import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { ClearErrorDetail, GetErrorDetail } from 'src/app/store/analytics.actions';
import { AnalyticsState } from 'src/app/store/analytics.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDetail } from 'src/app/models/error-detail';

@Component({
  selector: 'error-detail',
  templateUrl: './error-detail.component.html',
  styleUrl: './error-detail.component.css'
})
export class ErrorDetailComponent {
  private subscriptions = new Subscription();
  currentError!: ErrorDetail;
  currentErrorID!: string;
  
  constructor(
    public store: Store<{ analyticsState: AnalyticsState }>,
    private route: ActivatedRoute, private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      this.currentErrorID = params.get('id')!;
    });
    this.store.dispatch(GetErrorDetail({ itemID: this.currentErrorID }));
  }
  
  ngOnInit(): void {
    this.subscriptions.add(
      this.store
        .select((store) => store.analyticsState.errorDetail)
        .pipe(filter((currentError) => currentError !== null))
        .subscribe((currentError) => {
          this.currentError = currentError;
        })
    );
  }

  extractFromJson(obj: string) {
    if(obj == null) return '';
    obj = JSON.parse(obj);
    let returnValue = '';
    for (var i = 0; i < obj.length; i++) {
      Object.entries(obj[i]).forEach((element: any) => {
        if (element.includes('assembly')) {
          returnValue += element + '<br>';
        }
      });
    }
    returnValue = returnValue.replaceAll('assembly,', '');
    return returnValue;
  }

  back() {
    this.router.navigate(['/errors']);
  }

  public ngOnDestroy() {
    this.store.dispatch(ClearErrorDetail());
    this.subscriptions.unsubscribe();
  }
}
