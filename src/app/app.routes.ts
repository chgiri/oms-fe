import { Route } from '@angular/router';
import { LoginComponent } from '@oms-fe/auth';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
