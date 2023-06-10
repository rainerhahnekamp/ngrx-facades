import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, map, switchMap, tap } from 'rxjs/operators';
import { customersActions } from './customers.actions';
import { Customer } from '@app/customers/model';

@Injectable()
export class CustomersEffects {
  private url = '/customers';

  #actions$ = inject(Actions);
  #store = inject(Store);
  #http = inject(HttpClient);
  #router = inject(Router);

  add$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(customersActions.add),
      concatMap(({ customer }) =>
        this.#http.post<Customer>(this.url, customer)
      ),
      map((customer) => customersActions.added({ customer })),
      tap(() => this.#router.navigateByUrl('/customer'))
    )
  );

  update$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(customersActions.update),
      concatMap(({ customer }) => this.#http.put<Customer>(this.url, customer)),
      map((customer) => customersActions.updated({ customer })),
      tap(() => this.#router.navigateByUrl('/customer'))
    )
  );

  remove$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(customersActions.remove),
      concatMap(({ id }) => this.#http.delete<void>(`${this.url}/${id}`)),
      map(() => customersActions.removed()),
      tap(() => this.#router.navigateByUrl('/customer'))
    );
  });

  load$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(customersActions.load),
      switchMap(() => this.#http.get<{ content: Customer[] }>(this.url)),
      map(({ content }) =>
        customersActions.loaded({
          customers: content,
        })
      )
    )
  );
}
