import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { PagesComponent } from './modules/pages/pages.component';
import { UsersComponent } from './modules/users/users.component';
import { ErrorsComponent } from './modules/errors/errors.component';
import { NgModule } from '@angular/core';
import { UserDetailComponent } from './modules/users/user-detail/user-detail.component';
import { PageDetailComponent } from './modules/pages/page-detail/page-detail.component';
import { ErrorDetailComponent } from './modules/errors/error-detail/error-detail.component';
import { RecentActivityComponent } from './modules/recent-activity/recent-activity.component';
import { ComparisonComponent } from './modules/comparison/comparison.component';
const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Dashboard'
  },
  {
    path: 'pages',
    component: PagesComponent,
    title: 'Pages'
  },
  {
    path: 'users',
    component: UsersComponent,
    title: 'Users'
  },
  {
    path: 'errors',
    component: ErrorsComponent,
    title: 'Errors'
  },
  {
    path: 'user-detail/:id',
    component: UserDetailComponent,
    title: 'User Detail'
  },
  {
    path: 'page-detail/:id',
    component: PageDetailComponent,
    title: 'Page Detail'
  },
  {
    path: 'error-detail/:id',
    component: ErrorDetailComponent,
    title: 'Error Detail'
  },
  {
    path: 'recent-activity/:id',
    component: RecentActivityComponent,
    title: 'Recent Activity'
  },
  {
    path: 'comparison/:id',
    component: ComparisonComponent,
    title: 'Comparison'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routeConfig,
    {
      useHash: true
    , onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
