import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Inject,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormComponentForFormDialog } from './form-component-for-form-dialog-base';

@Component({
  selector: 'app-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDialogComponent implements AfterViewInit {
  @ViewChild('fromContainer', { read: ViewContainerRef })
  fromContainer: ViewContainerRef;

  componentClass: Type<FormComponentForFormDialog>;
  component: FormComponentForFormDialog;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.componentClass = this.data.component;
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      this.componentClass
    );
    const componentRef = this.fromContainer.createComponent(factory);
    this.cdr.detectChanges();
    this.component = componentRef.instance;
  }

  cancelClicked(): void {
    this.dialogRef.close(null);
  }

  saveClicked(): void {
    this.dialogRef.close(this.component.getFormValue());
  }
}
