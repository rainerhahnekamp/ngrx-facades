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
    <div *ngIf="viewModel" class="customers">
      <div class="row header">
        <p class="edit">&nbsp;</p>
        <p class="name">Name</p>
        <p class="country">Country</p>
        <p class="birthdate">Date of Birth</p>
      </div>
      <ng-container *ngIf="viewModel.customers.length > 0; else noCustomers">
        <div
          *ngFor="let customer of viewModel.customers"
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
        <div class="paginator">
          <button
            [disabled]="viewModel.currentPage === 0"
            mat-raised-button
            (click)="previousPage.emit()"
          >
            <mat-icon data-testid="btn-customers-back"> arrow_back </mat-icon>
          </button>
          {{ viewModel.currentPage + 1 }}
          <button
            [disabled]="viewModel.currentPage >= viewModel.pageCount"
            data-testid="btn-customers-next"
            mat-raised-button
            (click)="nextPage.emit()"
          >
            <mat-icon>arrow_forward</mat-icon>
          </button>
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
  @Input({ required: true }) viewModel: ViewModel | undefined;
  @Output() previousPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();
}
