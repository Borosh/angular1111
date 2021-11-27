import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface SelectOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-person-form',
  templateUrl: './add-person-form.component.html',
  styleUrls: ['./add-person-form.component.scss'],
})
export class AddPersonFormComponent implements OnInit {
  private static _form: FormGroup;

  genders: SelectOption[];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    AddPersonFormComponent._form = this.fb.group({
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

  get form() {
    return AddPersonFormComponent._form;
  }

  public static getFormValue() {
    return AddPersonFormComponent._form.value;
  }
}
