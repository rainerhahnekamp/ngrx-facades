import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
  withRequestsMadeViaParent,
} from '@angular/common/http';
import { Routes } from '@angular/router';
import { CustomersInterceptor } from './customers.interceptor';
import { EditCustomerComponent } from './components/edit-customer.component';
import { provideCustomers } from '@app/customers/data';
import { CustomersContainerComponent } from './components/customers-container.component';
import { NewCustomerComponent } from './components/new-customer.component';

export const customersRoutes: Routes = [
  {
    path: '',
    providers: [
      provideCustomers,
      provideHttpClient(withRequestsMadeViaParent(), withInterceptorsFromDi()),
      {
        provide: HTTP_INTERCEPTORS,
        useClass: CustomersInterceptor,
        multi: true,
      },
    ],
    children: [
      {
        path: '',
        component: CustomersContainerComponent,
      },
      { path: 'new', component: NewCustomerComponent },
      {
        path: ':id',
        component: EditCustomerComponent,
      },
    ],
  },
];

export default customersRoutes;
