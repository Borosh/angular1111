import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormComponentForFormDialogBaseClass } from '@shared/components/dialog/form-component-for-form-dialog-base';
import { SelectOption } from '@shared/components/select/select.component';

const nameShouldBeAdam =
  (): ValidatorFn =>
  (control: AbstractControl): ValidationErrors =>
    control.value === 'Adam' ? { nameShouldBeAdam: 'Pick something else' } : {};

@Component({
  selector: 'app-add-person-form',
  templateUrl: './add-person-form.component.html',
  styleUrls: ['./add-person-form.component.scss'],
})
export class AddPersonFormComponent
  extends FormComponentForFormDialogBaseClass
  implements OnInit
{
  genders: SelectOption[];

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required, nameShouldBeAdam()]),
      height: this.fb.control('', Validators.required),
      mass: this.fb.control('', Validators.required),
      gender: this.fb.control('', [Validators.required, nameShouldBeAdam()]),
    });

    this.genders = [
      { value: 'Adam', viewValue: 'Male' },
      { value: 'female', viewValue: 'Female' },
      { value: 'n/a', viewValue: 'n/a' },
    ];
  }
}
