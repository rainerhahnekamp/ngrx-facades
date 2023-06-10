import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Customer } from '@app/customers/model';

export const customersActions = createActionGroup({
  source: 'Customers',
  events: {
    load: emptyProps(),
    loaded: props<{ customers: Customer[] }>(),
    add: props<{ customer: Customer }>(),
    added: props<{ customer: Customer }>(),
    update: props<{ customer: Customer }>(),
    updated: props<{ customer: Customer }>(),
    remove: props<{ id: number }>(),
    removed: emptyProps(),
  },
});
