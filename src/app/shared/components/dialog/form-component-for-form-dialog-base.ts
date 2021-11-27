import { ComponentType } from '@angular/cdk/portal';

export interface FormComponentForFormDialog extends ComponentType<any> {
  getFormValue: () => Object;
  [key: string]: any;
}
