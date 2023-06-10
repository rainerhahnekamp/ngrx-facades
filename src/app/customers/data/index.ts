import { provideState } from '@ngrx/store';
import { customersFeature } from '@app/customers/data/customers.reducer';
import { provideEffects } from '@ngrx/effects';
import { CustomersEffects } from '@app/customers/data/customers-effects.service';

export { CustomersFacade } from './customers-facade';

export const provideCustomers = [
  provideState(customersFeature),
  provideEffects(CustomersEffects),
];
export { customers } from './data';
