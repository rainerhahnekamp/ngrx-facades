import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SecurityService } from '@app/security';
import { inject } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Configuration } from '@app/shared';

export const appRoutes: Routes = [
  {
    path: '',
    canActivate: [
      ({ queryParamMap }: ActivatedRouteSnapshot) => {
        const config = inject(Configuration);

        if (queryParamMap.has('mock-customers')) {
          config.updateFeatures({
            mockCustomers: queryParamMap.get('mock-customers') == '1',
          });
        }
      },
      () => {
        return inject(SecurityService).loaded$.pipe(filter(Boolean));
      },
    ],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      { path: 'home', redirectTo: '' },
      {
        path: 'customers',
        loadChildren: () => import('@app/customers/feature'),
      },
    ],
  },
];
