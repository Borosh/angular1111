import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input()
  disabled: boolean;
  @Input()
  loading: boolean;
  @Output()
  onClick = new EventEmitter<void>();

  clicked() {
    this.onClick.emit();
  }
}
