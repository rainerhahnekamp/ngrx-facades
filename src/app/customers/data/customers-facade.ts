import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { customersActions } from './customers.actions';
import { Observable } from 'rxjs';
import { Customer } from '@app/customers/model';
import { fromCustomers } from './customers.selectors';

@Injectable({ providedIn: 'root' })
export class CustomersFacade {
  #isLoaded = false;
  #store = inject(Store);

  get customers$(): Observable<Customer[]> {
    this.#assertLoaded();
    return this.#store.select(fromCustomers.selectAll);
  }

  byId(id: number): Observable<Customer | undefined> {
    this.#assertLoaded();

    return this.#store.select(fromCustomers.selectById(id));
  }

  #assertLoaded() {
    if (!this.#isLoaded) {
      this.#store.dispatch(customersActions.load());
      this.#isLoaded = true;
    }
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
