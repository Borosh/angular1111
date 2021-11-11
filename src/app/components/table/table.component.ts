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
  colDefs: ColDef[];
  @Input()
  rows: any[];
}
