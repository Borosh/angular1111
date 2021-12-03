import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormComponentForFormDialogBaseClass } from '@shared/components/form-dialog';
import { SelectOption } from '@shared/components/form-elements/select/select.component';
import { filter, tap } from 'rxjs/operators';

const genderShouldBeMale =
  (): ValidatorFn =>
  (control: AbstractControl): ValidationErrors =>
    control.value === 'male'
      ? {}
      : { genderShouldBeMale: 'Pick something else' };

@Component({
  selector: 'app-add-person-form',
  templateUrl: './add-person-form.component.html',
  styleUrls: ['./add-person-form.component.scss'],
})
export class AddPersonFormComponent
  extends FormComponentForFormDialogBaseClass
  implements OnInit
{
  form: FormGroup;

  genders: SelectOption[] = [
    { value: null, viewValue: 'None' },
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
    { value: 'n/a', viewValue: 'n/a' },
  ];

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control('', Validators.required),
      height: this.fb.control('', Validators.required),
      mass: this.fb.control('', Validators.required),
      gender: this.fb.control('', [Validators.required, genderShouldBeMale()]),
    });

    this.form
      .get('name')
      .valueChanges.pipe(
        tap(console.log),
        filter((value) => value === '1')
      )
      .subscribe((_) => {
        this.form.get('height').disable();
        this.form.get('gender').disable();
      });
    this.form.valueChanges.subscribe(console.log);
  }

  newValue(value: string) {
    console.log({ value });
  }
}
