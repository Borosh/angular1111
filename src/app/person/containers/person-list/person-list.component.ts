import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Person } from 'src/app/person/models/person';
import { PersonService } from 'src/app/person/services/person.service';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '@shared/components/dialog/form-dialog.component';
import { AddPersonFormComponent } from '../../components/add-person-form/add-person-form.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {
  persons$: Observable<Person[]>;
  totalNumberOfPersons$: Observable<number>;
  loading$: Observable<boolean>;

  firstLoaded = false;
  currentPage = 1;

  constructor(
    private personService: PersonService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.persons$ = this.personService.persons$;
    this.totalNumberOfPersons$ = this.personService.totalNumberOfPersons$;
    this.loading$ = this.personService.loading$;

    this.personService.loading$
      .pipe(filter((loading) => !loading))
      .subscribe((_) => (this.firstLoaded = true));
  }

  nextPage() {
    this.personService.getNextPage();
    this.currentPage++;
  }

  previousPage() {
    this.personService.getPreviousPage();
    this.currentPage--;
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

  openPersonDetails(person: Person) {
    this.router.navigate([person.id], { relativeTo: this.route });
  }
}
