import { customersActions as internalActions } from './customers.actions';
import { provideState } from '@ngrx/store';
import { customersFeature } from '@app/customers/data/customers.reducer';
import { provideEffects } from '@ngrx/effects';
import { CustomersEffects } from '@app/customers/data/customers-effects.service';

const { load, add, update, remove, nextPage, previousPage } = internalActions;
export const customersActions = {
  load,
  add,
  update,
  remove,
  nextPage,
  previousPage,
};
export { fromCustomers } from './customer.selectors';
export const provideCustomers = [
  provideState(customersFeature),
  provideEffects(CustomersEffects),
];
export { customers } from './data';
