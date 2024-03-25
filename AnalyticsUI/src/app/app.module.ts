import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { analyticsReducer } from './store/analytics.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AnalyticsStoreEffects } from './store/analytics.effects';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './routes';
import { UsersComponent } from './modules/users/users.component';
import { PagesComponent } from './modules/pages/pages.component';
import { ErrorsComponent } from './modules/errors/errors.component';
import { HomeComponent } from './modules/home/home.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetailComponent } from './modules/users/user-detail/user-detail.component';
import { PageDetailComponent } from './modules/pages/page-detail/page-detail.component';
import { ErrorDetailComponent } from './modules/errors/error-detail/error-detail.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
    declarations: [
        AppComponent,
        UsersComponent,
        PagesComponent,
        ErrorsComponent,
        HomeComponent,
        UserDetailComponent,
        PageDetailComponent,
        ErrorDetailComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        CommonModule,
        RouterModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        StoreModule.forRoot({
            analyticsState: analyticsReducer,
        }),
        EffectsModule.forRoot(
        [
            AnalyticsStoreEffects
        ]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
        GoogleMapsModule,
    ],
    providers: [Store],
    bootstrap: [AppComponent],
})

export class AppModule {
}
