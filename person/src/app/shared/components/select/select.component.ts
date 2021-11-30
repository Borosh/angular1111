import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { CustomFormElementBase } from '@shared/base/custom-form-element.base';

export interface SelectOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent extends CustomFormElementBase<string> {
  @ViewChild('select')
  select: MatSelect;

  @Input()
  options: SelectOption[];

  ngOnInit() {
    this.ngControl.statusChanges.subscribe((_) => {
      this.select.updateErrorState();
    });
  }
}
