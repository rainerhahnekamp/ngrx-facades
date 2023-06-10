import { Component, inject } from '@angular/core';
import { CustomersFacade } from '@app/customers/data';
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
  #facade = inject(CustomersFacade);

  submit(customer: Customer) {
    this.#facade.add(customer);
  }

  protected readonly newCustomer = newCustomer;
}
