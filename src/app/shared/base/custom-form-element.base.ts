import {
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  Input,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';

@Directive()
export class CustomFormElementBase<T> implements ControlValueAccessor {
  @Input()
  label: string;
  @Output()
  change = new EventEmitter<T>();
  @Input()
  disabled: boolean;
  @Input()
  required: boolean;
  @Input()
  value: T;

  @Input()
  valid = true;

  matcher: any;

  constructor(
    @Self() @Optional() protected ngControl: NgControl,
    private cdr: ChangeDetectorRef
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
      setTimeout(() => {
        console.log(this.ngControl);
        console.log({ requ: this.required, dis: this.disabled });
        ngControl.statusChanges.subscribe((_) => {
          console.log(this.ngControl.errors);
          this.disabled = this.ngControl.disabled;
          this.required = this.ngControl.control.hasValidator(
            Validators.required
          );
          console.log({ touched: this.ngControl.touched });
          this.checkIfValid();
        });

        this.matcher = {
          isErrorState: (): boolean => {
            return !!(
              this.ngControl &&
              this.ngControl.touched &&
              this.ngControl.invalid
            );
          },
        };
      }, 0);
    }
  }

  onChanged?: (...args: any[]) => void;
  onTouched?: (...args: any[]) => void;

  writeValue(value: T) {
    console.log('writeValue');
    if (this.onChanged) {
      this.onChanged(value);
    }
    this.value = value;
  }

  onValueChange(value: T) {
    this.change.emit(value);
    if (this.ngControl) {
      if (this.onTouched) {
        this.onTouched();
      }
      this.writeValue(value);
    }
  }

  registerOnChange(fn: any) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  private checkIfValid() {
    if (this.ngControl) {
      setTimeout(() => {
        this.valid = this.ngControl?.touched ? this.ngControl.valid : true;
        this.cdr.detectChanges();
      }, 0);
    }
  }
}
