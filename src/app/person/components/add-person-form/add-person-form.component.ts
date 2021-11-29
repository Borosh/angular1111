import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormComponentForFormDialogBaseClass } from '@shared/components/dialog/form-component-for-form-dialog-base';
import { SelectOption } from '@shared/components/select/select.component';

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
      name: this.fb.control('', Validators.required),
      height: this.fb.control('', Validators.required),
      mass: this.fb.control('', Validators.required),
      gender: this.fb.control('', Validators.required),
    });

    this.genders = [
      { value: 'male', viewValue: 'Male' },
      { value: 'female', viewValue: 'Female' },
      { value: 'n/a', viewValue: 'n/a' },
    ];
  }
}
