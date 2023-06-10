import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { customersActions } from './customers.actions';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '@app/customers/model';
import { fromCustomers } from './customers.selectors';

@Injectable({ providedIn: 'root' })
export class CustomersFacade {
  #store = inject(Store);
  #customers$ = new BehaviorSubject<Customer[]>([]);

  get customers$(): Observable<Customer[]> {
    return this.#store.select(fromCustomers.selectAll);
  }

  byId(id: number): Observable<Customer | undefined> {
    return this.#store.select(fromCustomers.selectById(id));
  }

  async load() {
    this.#store.dispatch(customersActions.load());
  }

  remove(id: number) {
    this.#store.dispatch(customersActions.remove({ id }));
  }

  update(customer: Customer) {
    this.#store.dispatch(customersActions.update({ customer }));
  }

  add(customer: Customer) {
    this.#store.dispatch(customersActions.add({ customer }));
  }
}
