import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ColDef } from 'src/app/shared/components/table/table.component';
import { tableColumns } from 'src/app/shared/decorators';
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
  persons: Person[];
  @Input()
  currentPage: number;
  @Input()
  totalNumberOfPersons: number;
  @Input()
  loading: boolean;

  @Output()
  nextPage = new EventEmitter<void>();
  @Output()
  previousPage = new EventEmitter<void>();

  tableColumns: ColDef[];

  onPageChanged(page: number) {
    page > this.currentPage ? this.nextPage.emit() : this.previousPage.emit();
  }
}
