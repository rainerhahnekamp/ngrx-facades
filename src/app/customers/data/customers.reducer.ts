import { createFeature, createReducer, on } from '@ngrx/store';
import { customersActions } from './customers.actions';
import { Customer } from '@app/customers/model';

export interface State {
  customers: Customer[];
}

export const initialState: State = {
  customers: [],
};

export const customersFeature = createFeature({
  name: 'customers',
  reducer: createReducer<State>(
    initialState,
    on(customersActions.load, (state) => ({ ...state })),
    on(customersActions.loaded, (state, { customers }) => ({
      ...state,
      customers,
    })),
    on(
      customersActions.added,
      customersActions.updated,
      customersActions.removed,
      () => initialState
    )
  ),
});
