import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { InlineMenuItem } from '@shared/components/inline-menu';
import { ColDef } from '@shared/components/table/table.component';
import { tableColumns } from '@shared/decorators/table-columns.decorator';
import { Person } from '../../models/person';

@tableColumns('name', 'height', 'mass', 'gender', {
  key: 'actions',
  type: 'actions',
})
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
  @Output()
  personClicked = new EventEmitter<Person>();

  tableColumns: ColDef[];

  actions: InlineMenuItem<Person>[] = [
    {
      icon: 'star',
      label: 'View',
      action: (person: Person) => {
        this.personClicked.emit(person);
      },
    },
  ];

  onPageChanged(page: number) {
    window.dispatchEvent(new Event('fromPersonList'));
    page > this.currentPage
      ? this.nextPageClicked.emit()
      : this.previousPageClicked.emit();
  }
}
