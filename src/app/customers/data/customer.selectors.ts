import { createSelector } from '@ngrx/store';
import { customersFeature } from './customers.reducer';
import { Customer } from '@app/customers/model';

const selectAll = customersFeature.selectCustomers;

const selectById = (id: number) =>
  createSelector(selectAll, (state: Customer[]) =>
    state.find((p) => p.id === id)
  );

const { selectCurrentPage, selectPageCount } = customersFeature;

const selectCustomersAndPage = createSelector(
  selectAll,
  selectCurrentPage,
  selectPageCount,
  (customers, currentPage, pageCount) => ({
    customers,
    currentPage,
    pageCount,
  })
);

export const fromCustomers = {
  selectAll,
  selectById,
  selectCurrentPage,
  selectCustomersAndPage,
};
