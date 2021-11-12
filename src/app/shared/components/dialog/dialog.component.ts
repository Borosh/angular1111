import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      animal: new FormControl('test', Validators.required),
      animal2: new FormControl('test2'),
      animals: new FormArray([
        new FormGroup({
          value: new FormControl(),
        }),
        new FormGroup({
          value: new FormControl(),
        }),
      ]),
    });

    this.form.valueChanges.subscribe(console.log);
  }

  get animalsGroups(): FormGroup[] {
    return (this.form.get('animals') as FormArray).controls as FormGroup[];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick() {
    console.log(this.data);
    // this.dialogRef.close('hello');
  }
}
