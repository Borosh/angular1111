import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  form: FormGroup;

  genders = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
    { value: 'n/a', viewValue: 'n/a' },
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      height: new FormControl('', Validators.required),
      mass: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });

    this.form.valueChanges.subscribe(console.log);
  }

  get animalsGroups(): FormGroup[] {
    return (this.form.get('animals') as FormArray).controls as FormGroup[];
  }

  cancelClicked(): void {
    this.dialogRef.close();
  }

  saveClicked() {
    this.dialogRef.close(this.form.value);
  }
}
