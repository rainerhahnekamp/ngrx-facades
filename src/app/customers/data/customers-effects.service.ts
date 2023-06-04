import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { concatMap, map, switchMap, tap } from 'rxjs/operators';
import { fromCustomers } from './customer.selectors';
import { customersActions } from './customers.actions';
import { Customer } from '@app/customers/model';

@Injectable()
export class CustomersEffects {
  private pageSize = 10;
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

  #fetchCustomers = <T>(
    observable: Observable<T>
  ): Observable<{ customers: Customer[]; pageCount: number }> =>
    observable.pipe(
      concatLatestFrom(() =>
        this.#store.select(fromCustomers.selectCurrentPage)
      ),
      switchMap(([, page]) =>
        this.#http.get<{ content: Customer[]; total: number }>(this.url, {
          params: new HttpParams()
            .append('page', '' + page)
            .append('pageSize', this.pageSize),
        })
      ),
      map(({ content, total }) => ({
        customers: content,
        pageCount: Math.floor(total / this.pageSize),
      })),
      tap(console.log)
    );

  nextPage$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(customersActions.nextPage),
      this.#fetchCustomers,
      map(({ customers }) => customersActions.nextPageSuccess({ customers }))
    );
  });

  previousPage$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(customersActions.previousPage),
      this.#fetchCustomers,
      map(({ customers }) =>
        customersActions.previousPageSuccess({ customers })
      )
    );
  });

  load$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(customersActions.load),
      this.#fetchCustomers,
      map(({ customers, pageCount }) =>
        customersActions.loaded({
          customers,
          pageCount,
        })
      )
    )
  );
}
