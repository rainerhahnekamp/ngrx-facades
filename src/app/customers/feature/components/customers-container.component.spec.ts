import { TestBed } from '@angular/core/testing';
import { CustomersContainerComponent } from './customers-container.component';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';

it('should show customers', () => {
  const fixture = TestBed.configureTestingModule({
    imports: [CustomersContainerComponent],
    providers: [
      provideRouter([]),
      provideMockStore({
        initialState: {
          customers: {
            customers: [
              {
                firstname: 'Sabine',
                name: 'Miscovics',
                country: 'AT',
                birthday: '1993-05-09',
              },
            ],
          },
          currentPage: 1,
          pageCount: 1,
        },
      }),
    ],
  }).createComponent(CustomersContainerComponent);
  fixture.detectChanges();

  expect(
    document
      .querySelector('[data-testid=row-customer] p.name')
      ?.innerHTML.trim()
  ).toBe('Sabine Miscovics');
});
