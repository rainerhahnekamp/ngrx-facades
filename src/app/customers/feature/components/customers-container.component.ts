import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CustomersComponent } from '@app/customers/ui';
import { CustomersFacade } from '@app/customers/data';

@Component({
  template: `<app-customers
    *ngIf="facade.customers$ | async as customers"
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
  protected facade = inject(CustomersFacade);
}
