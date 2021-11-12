import { Component, Input } from '@angular/core';

export interface ColDef {
  header: string;
  key: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
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
}
