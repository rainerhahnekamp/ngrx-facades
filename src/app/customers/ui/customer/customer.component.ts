import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormErrorsComponent } from '@app/shared';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Customer } from '@app/customers/model';

@Component({
  selector: 'app-customer',
  template: `
    <div>
      <mat-form-field>
        <mat-label>Firstname</mat-label>
        <input *ngIf="customer" [(ngModel)]="customer.firstname" matInput />
      </mat-form-field>
    </div>

    <form (ngSubmit)="submit()" [formGroup]="formGroup" class="app-customer">
      <input type="hidden" formControlName="id" />
      <mat-form-field>
        <mat-label>Firstname</mat-label>
        <input
          data-testid="inp-firstname"
          formControlName="firstname"
          matInput
        />
        <mat-error>
          <app-form-errors
            [control]="formGroup.controls.firstname"
          ></app-form-errors>
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Name</mat-label>
        <input data-testid="inp-name" formControlName="name" matInput />
        <mat-error>
          <app-form-errors
            [control]="formGroup.controls.name"
          ></app-form-errors>
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Country</mat-label>
        <mat-select formControlName="country" data-testid="sel-country">
          <mat-option
            *ngFor="let country of countries"
            [value]="country.value"
            data-testid="opt-country"
            >{{ country.label }}</mat-option
          >
        </mat-select>
        <mat-error>
          <app-form-errors
            [control]="formGroup.controls.country"
          ></app-form-errors>
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Birthdate</mat-label>
        <input
          matInput
          [matDatepicker]="picker"
          formControlName="birthdate"
          data-testid="inp-birthdate"
        />
        <mat-datepicker-toggle matIconSuffix [for]="picker" />
        <mat-datepicker #picker />
        <mat-error>
          <app-form-errors
            [control]="formGroup.controls.birthdate"
          ></app-form-errors>
        </mat-error>
      </mat-form-field>

      <div class="buttons">
        <a [routerLink]="['..']" mat-raised-button>Back</a>
        <button
          *ngIf="customer"
          (click)="handleRemove(customer.id)"
          color="warn"
          mat-raised-button
          type="button"
        >
          Delete
        </button>
        <button
          color="primary"
          mat-raised-button
          type="submit"
          data-testid="btn-submit"
        >
          Save
        </button>
      </div>
    </form>
  `,
  styleUrls: ['./customer.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    RouterLink,
    NgIf,
    MatFormFieldModule,
    FormErrorsComponent,
    MatInputModule,
    MatSelectModule,
    NgForOf,
    FormsModule,
  ],
})
export class CustomerComponent implements OnChanges {
  @Input({ required: true }) customer: Customer | undefined;
  @Input({ required: true }) countries: { label: string; value: string }[] = [];
  @Output() save = new EventEmitter<Customer>();
  @Output() remove = new EventEmitter<number>();

  protected formGroup = inject(NonNullableFormBuilder).group({
    id: [0],
    firstname: ['', [Validators.required]],
    name: ['', [Validators.required]],
    country: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
  });

  ngOnChanges(changes: SimpleChanges) {
    if ('customer' in changes && this.customer) {
      this.formGroup.setValue(this.customer);
    }
  }

  protected submit() {
    if (this.formGroup.valid) {
      this.save.emit(this.formGroup.getRawValue());
    }
  }

  protected handleRemove(id: number) {
    if (confirm(`Really delete?`)) {
      this.remove.emit(id);
    }
  }
}
