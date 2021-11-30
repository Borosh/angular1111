import { FormGroup } from '@angular/forms';

export interface FormComponentForFormDialog {
  form: FormGroup;
  getFormValue: () => Object;
  [key: string]: any;
}

export class FormComponentForFormDialogBaseClass
  implements FormComponentForFormDialog
{
  form: FormGroup;

  public getFormValue() {
    return this.form.value;
  }
}
