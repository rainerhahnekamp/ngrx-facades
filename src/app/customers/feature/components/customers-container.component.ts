import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromCustomers } from '@app/customers/data';
import { CustomersComponent } from '@app/customers/ui';

@Component({
  template: `<app-customers
    *ngIf="customers$ | async as customers"
    [customers]="customers"
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
  customers$ = this.#store.select(fromCustomers.selectAll);
}
