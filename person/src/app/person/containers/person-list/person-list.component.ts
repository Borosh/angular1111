import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';
import { Person } from '@person/models/person';
import { PersonService } from '@person/services/person.service';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '@shared/components/form-dialog';
import { AddPersonFormComponent } from '../../components/add-person-form/add-person-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as personSelectors from '@shared/store/person-store/selectors/person.selector';
import {
  getPersonNextPage,
  getPersonPreviousPage,
} from '@shared/store/person-store';

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
    this.persons$ = this.store
      .select(personSelectors.selectPersons)
      .pipe(filter((persons) => !!persons.length));
    this.totalNumberOfPersons$ = this.store.select(
      personSelectors.selectTotalNumberOfPersons
    );
    this.loading$ = this.store.pipe(select(personSelectors.selectLoading));
    this.currentPage$ = this.store.select(personSelectors.selectCurrentPage);

    this.firstLoaded$ = combineLatest([
      this.loading$,
      this.store.select(personSelectors.selectLoaded),
    ]).pipe(
      filter(([loading, loaded]) => !loading && loaded),
      mapTo(true)
    );
  }

  nextPage() {
    this.store.dispatch(getPersonNextPage());
  }

  previousPage() {
    this.store.dispatch(getPersonPreviousPage());
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

  openPersonPage(person: Person) {
    this.router.navigate([person.id], { relativeTo: this.route });
  }
}
