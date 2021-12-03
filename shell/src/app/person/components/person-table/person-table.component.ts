import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { InlineMenuItem } from '@shared/components/inline-menu/inline-menu.component';
import { ColDef } from '@shared/components/table/table.component';
import { tableColumns } from '@shared/decorators';
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
  @Output()
  personSelected = new EventEmitter<Person>();

  tableColumns: ColDef[];

  actions: InlineMenuItem<Person>[] = [
    {
      label: 'View',
      icon: 'star',
      action: (person: Person) => {
        this.personSelected.emit(person);
      },
    },
  ];

  onPageChanged(page: number) {
    page > this.currentPage ? this.nextPage.emit() : this.previousPage.emit();
  }
  
}
