import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormComponentForFormDialog } from './form-component-for-form-dialog.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements AfterViewInit {
  title: string;

  component: FormComponentForFormDialog;

  @ViewChild('formContainer', { read: ViewContainerRef })
  formContainer: ViewContainerRef;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.title = this.data.title;
    const componentClass = this.data.component;
    const factory =
      this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const componentRef = this.formContainer.createComponent(factory);
    this.cdr.detectChanges();
    this.component = componentRef.instance as FormComponentForFormDialog;
    console.log({
      formContainer: this.formContainer,
      componentRef,
      component: this.component,
    });
  }

  cancelClicked(): void {
    this.dialogRef.close();
  }

  saveClicked() {
    this.dialogRef.close(this.component.getFormValue());
  }
}
