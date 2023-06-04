import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { customersActions, fromCustomers } from '@app/customers/data';
import { CustomerComponent } from '@app/customers/ui';
import { AsyncPipe, NgIf } from '@angular/common';
import { filterDefined } from '@app/shared';
import { Customer } from '@app/customers/model';
import { countries } from '../countries';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-customer',
  template: `<app-customer
    *ngIf="customer$ | async as customer"
    [customer]="customer"
    [countries]="countries"
    (save)="submit($event)"
    (remove)="remove($event)"
  />`,
  standalone: true,
  imports: [CustomerComponent, AsyncPipe, NgIf],
})
export class EditCustomerComponent implements OnInit {
  @Input() id = '';
  #store = inject(Store);
  protected customer$: Observable<Customer> | undefined;

  ngOnInit() {
    this.customer$ = this.#store
      .select(fromCustomers.selectById(Number(this.id || 1)))
      .pipe(filterDefined);
  }

  submit(customer: Customer) {
    this.#store.dispatch(customersActions.update({ customer }));
  }

  remove(id: number) {
    if (confirm(`Really delete?`)) {
      this.#store.dispatch(customersActions.remove({ id }));
    }
  }

  protected readonly countries = countries;
}
