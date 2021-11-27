import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ColDef } from 'src/app/shared/components/table/table.component';
import { Person } from 'src/app/person/models/person';
import { PersonService } from 'src/app/person/services/person.service';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from 'src/app/shared/components/dialog/form-dialog.component';
import { AddPersonFormComponent } from '../../components/add-person-form/add-person-form.component';
import { tableColumns } from 'src/app/shared/decorators/table-columns.decorator';
import { WindowEventListener, Log } from 'src/app/shared/decorators';

@tableColumns('name', 'height', 'mass', 'gender')
@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {
  tableColumns: ColDef[];

  persons$: Observable<Person[]>;
  totalNumberOfPersons$: Observable<number>;
  loading$: Observable<boolean>;

  firstLoaded = false;
  currentPage = 1;

  constructor(private personService: PersonService, public dialog: MatDialog) {}

  ngOnInit() {
    this.persons$ = this.personService.persons$;
    this.totalNumberOfPersons$ = this.personService.totalNumberOfPersons$;
    this.loading$ = this.personService.loading$;

    this.personService.loading$
      .pipe(filter((loading) => !loading))
      .subscribe((_) => (this.firstLoaded = true));
  }

  onPageChanged(page: number) {
    page > this.currentPage
      ? this.personService.getNextPage()
      : this.personService.getPreviousPage();

    this.currentPage = page;

    return page;
  }

  @WindowEventListener('resize')
  @Log()
  doSomething() {
    console.log('this is something');
    console.log({ this: this });
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '450px',
      data: {
        component: AddPersonFormComponent,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
      }
    });
  }
}
