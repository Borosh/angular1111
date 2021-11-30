import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, mapTo, tap } from 'rxjs/operators';
import { Person } from 'src/app/person/models/person';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '@shared/components/dialog/form-dialog.component';
import { AddPersonFormComponent } from '../../components/add-person-form/add-person-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromPersons from '@person/store/selectors';
import * as personActions from '@person/store/actions';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {
  persons$: Observable<Person[]>;
  totalNumberOfPersons$: Observable<number>;
  loading$: Observable<boolean>;
  firstLoaded$: Observable<boolean>;
  currentPage$: Observable<number>;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.persons$ = this.store.pipe(
      select(fromPersons.selectPersonsEntities),
      filter((persons) => !!persons?.length)
    );
    this.currentPage$ = this.store.select(fromPersons.selectCurrentPage);
    this.totalNumberOfPersons$ = this.store.select(
      fromPersons.selectTotalNumberOfPersons
    );
    this.loading$ = this.store.select(fromPersons.selectPersonsLoading);

    this.firstLoaded$ = combineLatest([
      this.store.select(fromPersons.selectPersonsLoading),
      this.store.select(fromPersons.selectPersonsLoaded),
    ]).pipe(
      filter(([loading, loaded]) => !loading && loaded),
      mapTo(true)
    );
  }

  nextPage() {
    this.store.dispatch(personActions.getPersonsNextPage());
  }

  previousPage() {
    this.store.dispatch(personActions.getPersonsPreviousPage());
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
