import { Component, inject, Input, OnInit } from '@angular/core';
import { CustomersFacade } from '@app/customers/data';
import { CustomerComponent } from '@app/customers/ui';
import { AsyncPipe, NgIf } from '@angular/common';
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
  #facade = inject(CustomersFacade);

  protected customer$: Observable<Customer> | undefined;

  ngOnInit() {
    this.customer$ = this.#facade.byId(Number(this.id || 0));
  }

  submit(customer: Customer) {
    this.#facade.update(customer);
  }

  remove(id: number) {
    if (confirm(`Really delete?`)) {
      this.#facade.remove(id);
    }
  }

  protected readonly countries = countries;
}
