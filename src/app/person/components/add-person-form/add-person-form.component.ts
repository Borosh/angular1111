import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormComponentForFormDialogBaseClass } from 'src/app/shared/components/form-dialog';

interface SelectOption {
  value: string;
  viewValue: string;
}

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
      gender: this.fb.control('', Validators.required),
    });
    this.form.valueChanges.subscribe(console.log);
  }
}
