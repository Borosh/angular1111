import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { PersonService } from '@person/services/person.service';
import { of } from 'rxjs';
import { catchError, switchMap, first } from 'rxjs/operators';
import {
  getPersonById,
  getPersonByIdFailed,
  getPersonByIdSuccess,
  getPersonsByPage,
  getPersonsFailed,
  getPersonsNextPage,
  getPersonsPreviousPage,
  getPersonsSuccess,
  setTotalNumerOfPersons,
} from '../actions/person.actions';
import {
  selectCurrentPage,
  selectPersonById,
  selectPersonsEntities,
} from '../selectors/person.selector';

@Injectable()
export class PersonEffects {
  constructor(
    private actions$: Actions,
    private personService: PersonService,
    private store: Store<any>
  ) {}

  getPersonsNextPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPersonsNextPage),
      switchMap((_) =>
        this.store.select(selectCurrentPage).pipe(
          first(),
          switchMap((currentPage) => [
            getPersonsByPage({ page: currentPage + 1 }),
          ]),
          catchError((error) => of(getPersonsFailed({ error })))
        )
      )
    )
  );

  getPersonsPreviousPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPersonsPreviousPage),
      switchMap((_) =>
        this.store.select(selectCurrentPage).pipe(
          first(),
          switchMap((currentPage) => [
            getPersonsByPage({ page: currentPage - 1 }),
          ]),
          catchError((error) => of(getPersonsFailed({ error })))
        )
      )
    )
  );

  getPersons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPersonsByPage),
      switchMap(({ page }) =>
        this.store.select(selectPersonsEntities).pipe(
          first(),
          switchMap((persons) =>
            persons?.length
              ? [getPersonsSuccess({ persons })]
              : this.personService.getPersons(page).pipe(
                  first(),
                  switchMap((response) => [
                    getPersonsSuccess({ persons: response.results }),
                    setTotalNumerOfPersons({
                      totalNumberOfPersons: response.count,
                    }),
                  ]),
                  catchError((error) => of(getPersonsFailed({ error })))
                )
          )
        )
      )
    )
  );
  getPersonById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPersonById),
      switchMap(({ id }) =>
        this.store.select(selectPersonById(id)).pipe(
          first(),
          switchMap((person) =>
            person
              ? [getPersonByIdSuccess({ person })]
              : this.personService.getPersonsById(id).pipe(
                  first(),
                  switchMap((person) => [getPersonByIdSuccess({ person })]),
                  catchError((error) => of(getPersonByIdFailed({ error })))
                )
          )
        )
      )
    )
  );
}
