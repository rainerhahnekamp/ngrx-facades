import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { customersActions, fromCustomers } from '@app/customers/data';
import { CustomersComponent } from '@app/customers/ui';

@Component({
  template: `<app-customers
    *ngIf="viewModel$ | async as viewModel"
    [viewModel]="viewModel"
    (nextPage)="nextPage()"
    (previousPage)="previousPage()"
  />`,
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    AsyncPipe,
    DatePipe,
    NgIf,
    NgForOf,
    CustomersComponent,
  ],
})
export class CustomersContainerComponent {
  #store = inject(Store);
  viewModel$ = this.#store.select(fromCustomers.selectCustomersAndPage);

  previousPage() {
    this.#store.dispatch(customersActions.previousPage());
  }

  nextPage() {
    this.#store.dispatch(customersActions.nextPage());
  }
}
