import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { PagesComponent } from './modules/pages/pages.component';
import { UsersComponent } from './modules/users/users.component';
import { ErrorsComponent } from './modules/errors/errors.component';
import { NgModule } from '@angular/core';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routeConfig,
    {
      useHash: true
    , onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
