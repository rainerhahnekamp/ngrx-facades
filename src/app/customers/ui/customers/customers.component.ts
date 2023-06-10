import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Customer } from '@app/customers/model';

export type ViewModel = {
  customers: Customer[];
  currentPage: number;
  pageCount: number;
};

@Component({
  selector: 'app-customers',
  template: `<h2 class="my-2">Customers</h2>
    <p>
      <a
        [routerLink]="['.', 'new']"
        color="primary"
        data-testid="btn-customers-add"
        mat-raised-button
        >Add Customer</a
      >
    </p>
    <div *ngIf="customers.length > 0" class="customers">
      <div class="row header">
        <p class="edit">&nbsp;</p>
        <p class="name">Name</p>
        <p class="country">Country</p>
        <p class="birthdate">Date of Birth</p>
      </div>
      <ng-container *ngIf="customers.length > 0; else noCustomers">
        <div
          *ngFor="let customer of customers"
          class="row"
          data-testid="row-customer"
          [attr.aria-labelledby]="'customer-' + customer.id"
        >
          <p class="edit" data-testid="btn-edit">
            <a [routerLink]="['.', customer.id]" aria-label="Edit Customer">
              <mat-icon>edit</mat-icon>
            </a>
          </p>
          <p class="name" [id]="'customer-' + customer.id">
            {{ customer.firstname }} {{ customer.name }}
          </p>
          <p class="country">{{ customer.country }}</p>
          <p class="birthdate">{{ customer.birthdate | date }}</p>
        </div>
      </ng-container>
      <ng-template #noCustomers>
        <p>We don't have any customers yet 😥</p>
      </ng-template>
    </div> `,
  styleUrls: ['./customers.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    AsyncPipe,
    DatePipe,
    NgIf,
    NgForOf,
  ],
})
export class CustomersComponent {
  @Input({ required: true }) customers: Customer[] = [];
  @Output() previousPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();
}
