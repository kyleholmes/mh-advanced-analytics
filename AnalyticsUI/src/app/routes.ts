import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages/pages.component';
import { UsersComponent } from './users/users.component';
import { ErrorsComponent } from './errors/errors.component';
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

export default routeConfig;
