import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ColDef } from '../table/table.component';

@Component({
  selector: 'app-paginable-table',
  templateUrl: './paginable-table.component.html',
  styleUrls: ['./paginable-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginableTableComponent implements AfterViewInit {
  @Input()
  colDefs: ColDef[];
  @Input()
  rows: any[];
  @Input()
  currentPage: number;
  @Input()
  totalNumberOfElements: number;
  @Input()
  loading: boolean;

  @ViewChild('paginator')
  paginator: MatPaginator;

  @Output()
  pageChange = new EventEmitter<number>();

  ngAfterViewInit() {
    console.log(this.paginator);
  }

  onPageChange({ pageIndex, previousPageIndex }: PageEvent) {
    pageIndex > previousPageIndex
      ? this.onNextPageClick()
      : this.onPreviousPageClick();
  }

  onPreviousPageClick() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  onNextPageClick() {
    if (this.currentPage < this.totalNumberOfElements) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}
