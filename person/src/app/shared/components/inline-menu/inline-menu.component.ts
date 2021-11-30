import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

export interface InlineMenuItem<T = any> {
  icon: string;
  label: string;
  action: MenuItemAction<T>;
}

export type MenuItemAction<T = any> = (data: T) => void;

@Component({
  selector: 'app-inline-menu',
  templateUrl: './inline-menu.component.html',
  styleUrls: ['./inline-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineMenuComponent {
  @Input()
  options: InlineMenuItem[];
  @Output()
  optionClicked = new EventEmitter<MenuItemAction>();

  optionClick(action: MenuItemAction) {
    this.optionClicked.emit(action);
  }
}
