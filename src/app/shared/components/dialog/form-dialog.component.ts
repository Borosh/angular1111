import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentPortal } from '@angular/cdk/portal';
import { FormComponentForFormDialog } from './form-component-for-form-dialog-base';

@Component({
  selector: 'app-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  portal: ComponentPortal<FormComponentForFormDialog>;
  component: FormComponentForFormDialog;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { component: FormComponentForFormDialog } & any
  ) {}

  ngOnInit() {
    this.component = this.data.component;
    this.portal = new ComponentPortal(this.component);
  }

  ngAfterViewInit() {}

  cancelClicked(): void {
    this.dialogRef.close(false);
  }

  saveClicked() {
    this.dialogRef.close(this.component.getFormValue());
  }
}
