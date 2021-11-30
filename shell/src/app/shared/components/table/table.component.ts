import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItemAction } from '../inline-menu';

export interface ColDef {
  header?: string;
  key: string;
  type?: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input()
  set colDefs(colDefs: ColDef[]) {
    this.displayedColumns = colDefs.map(({ key }) => key);
    this._colDefs = colDefs;
  }

  @Input()
  rows: any[];

  private _colDefs: ColDef[];

  get colDefs() {
    return this._colDefs;
  }
  displayedColumns: string[];

  onActionClick(action: MenuItemAction<any>, data: any) {
    action(data);
  }
}
