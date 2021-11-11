import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColDef } from '../table/table.component';

@Component({
  selector: 'app-paginable-table',
  templateUrl: './paginable-table.component.html',
  styleUrls: ['./paginable-table.component.scss'],
})
export class PaginableTableComponent {
  @Input()
  colDefs: ColDef[];
  @Input()
  rows: any[];
  @Input()
  currentPage: number;
  @Input()
  totalNumberOfPages: number;

  @Output()
  pageChange = new EventEmitter<number>();

  onPreviousPageClick() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  onNextPageClick() {
    if (this.currentPage < this.totalNumberOfPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}
