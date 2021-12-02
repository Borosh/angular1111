import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ColDef } from 'src/app/shared/components/table/table.component';
import { Person } from 'src/app/person/models/person';
import { PersonService } from 'src/app/person/services/person.service';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from 'src/app/shared/components/form-dialog';
import { AddPersonFormComponent } from '../../components/add-person-form/add-person-form.component';
import {
  TableColumnsProperty,
  tableColumns,
  Log,
} from 'src/app/shared/decorators';
import { WindowEventListener } from 'src/app/shared/decorators/window-resize.decorator';
import { readonly } from 'src/app/shared/decorators/readonly.decorator';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {
  @TableColumnsProperty('name', 'height', 'mass', 'gender')
  tableColumns: ColDef[];

  persons$: Observable<Person[]>;
  totalNumberOfPersons$: Observable<number>;
  loading$: Observable<boolean>;

  firstLoaded = false;
  @readonly currentPage = 1;

  constructor(private personService: PersonService, public dialog: MatDialog) {
    this.currentPage = 2;
  }

  ngOnInit() {
    this.persons$ = this.personService.persons$;
    this.totalNumberOfPersons$ = this.personService.totalNumberOfPersons$;
    this.loading$ = this.personService.loading$;

    this.personService.loading$
      .pipe(filter((loading) => !loading))
      .subscribe((_) => (this.firstLoaded = true));
  }

  onPageChanged(page: number) {
    this.test('test1');
    page > this.currentPage
      ? this.personService.getNextPage()
      : this.personService.getPreviousPage();

    this.currentPage = page;
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '450px',
      data: {
        title: 'Add person',
        component: AddPersonFormComponent,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  @Log()
  test(a: string) {
    console.log(1);
    console.log(this.thisTest());
    console.log(2);
    return 2;
  }

  thisTest() {
    console.log('thisTestRan');
  }
}
