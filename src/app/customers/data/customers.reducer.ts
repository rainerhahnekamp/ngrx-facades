import { createFeature, createReducer, on } from '@ngrx/store';
import { customersActions } from './customers.actions';
import { Customer } from '@app/customers/model';

export interface State {
  customers: Customer[];
  currentPage: number;
  pageCount: number;
}

export const initialState: State = {
  customers: [],
  currentPage: 0,
  pageCount: 0,
};

export const customersFeature = createFeature({
  name: 'customers',
  reducer: createReducer<State>(
    initialState,
    on(customersActions.load, (state) => ({ ...state, currentPage: 0 })),
    on(customersActions.loaded, (state, { customers, pageCount }) => ({
      ...state,
      customers,
      pageCount,
    })),
    on(
      customersActions.added,
      customersActions.updated,
      customersActions.removed,
      () => initialState
    ),
    on(customersActions.previousPage, (state) => ({
      ...state,
      currentPage: state.currentPage - 1,
    })),
    on(customersActions.nextPage, (state) => ({
      ...state,
      currentPage: state.currentPage + 1,
    })),
    on(
      customersActions.previousPageSuccess,
      customersActions.nextPageSuccess,
      (state, { customers }) => ({
        ...state,
        customers,
      })
    )
  ),
});
