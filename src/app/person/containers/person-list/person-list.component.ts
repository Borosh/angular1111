import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ColDef } from 'src/app/shared/components/table/table.component';
import { Person } from 'src/app/person/models/person';
import { PersonService } from 'src/app/person/services/person.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {
  colDefs: ColDef[] = [
    { header: 'Name', key: 'name' },
    { header: 'Height', key: 'height' },
    { header: 'Mass', key: 'mass' },
    { header: 'Gender', key: 'gender' },
  ];

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
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
