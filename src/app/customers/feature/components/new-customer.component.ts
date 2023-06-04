import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { customersActions } from '@app/customers/data';
import { countries } from '../countries';
import { Customer } from '@app/customers/model';
import { CustomerComponent } from '@app/customers/ui';

const newCustomer: Customer = {
  id: 0,
  firstname: '',
  name: '',
  birthdate: '1991-01-01',
  country: 'DE',
};

@Component({
  selector: 'app-new-customer',
  template: `<app-customer
    [customer]="newCustomer"
    [countries]="countries"
    (save)="submit($event)"
  />`,
  standalone: true,
  imports: [CustomerComponent],
})
export class NewCustomerComponent {
  countries = countries;
  #store = inject(Store);

  submit(customer: Customer) {
    this.#store.dispatch(customersActions.add({ customer }));
  }

  protected readonly newCustomer = newCustomer;
}
