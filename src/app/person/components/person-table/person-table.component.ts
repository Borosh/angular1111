import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ColDef } from 'src/app/shared/components/table/table.component';
import { tableColumns } from 'src/app/shared/decorators/table-columns.decorator';
import { Person } from '../../models/person';

@tableColumns('name', 'height', 'mass', 'gender')
@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonTableComponent {
  @Input()
  currentPage: number;
  @Input()
  persons: Person[];
  @Input()
  totalNumberOfPersons: number;
  @Input()
  loading: boolean;
  @Output()
  nextPageClicked = new EventEmitter<void>();
  @Output()
  previousPageClicked = new EventEmitter<void>();

  tableColumns: ColDef[];

  onPageChanged(page: number) {
    page > this.currentPage
      ? this.nextPageClicked.emit()
      : this.previousPageClicked.emit();
  }
}
