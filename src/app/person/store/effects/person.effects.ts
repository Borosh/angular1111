import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { PersonService } from '@person/services/person.service';
import { of } from 'rxjs';
import { catchError, first, map, switchMap, tap } from 'rxjs/operators';
import {
  getPersonById,
  getPersonByIdFailed,
  getPersonByIdSuccess,
  getPersonNextPage,
  getPersonPreviousPage,
  getPersonsByPage,
  getPersonsByPageFailed,
  getPersonsByPageSuccess,
  setTotalNumberOfPersons,
} from '../actions/person.actions';
import {
  selectCurrentPage,
  selectEntitiesByPage,
} from '../selectors/person.selector';

@Injectable()
export class PersonEffects {
  constructor(
    private actions$: Actions,
    private personService: PersonService,
    private store: Store
  ) {}

  getPersonsByPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPersonsByPage),
      switchMap(({ page }) =>
        this.store.select(selectEntitiesByPage(page)).pipe(
          first(),
          switchMap((personIds) =>
            personIds?.length
              ? [getPersonsByPageSuccess({ page })]
              : this.personService.getPersons(page).pipe(
                  map((request) => ({
                    persons: request.results,
                    totalNumberOfPersons: request.count,
                  })),
                  switchMap(({ persons, totalNumberOfPersons }) => [
                    getPersonsByPageSuccess({ persons, page }),
                    setTotalNumberOfPersons({ totalNumberOfPersons }),
                  ]),
                  catchError((error) => of(getPersonsByPageFailed(error)))
                )
          )
        )
      )
    )
  );

  getPersonNextPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPersonNextPage),
      switchMap((_) =>
        this.store.select(selectCurrentPage).pipe(
          first(),
          switchMap((currentPage) => [
            getPersonsByPage({ page: currentPage + 1 }),
          ])
        )
      )
    )
  );

  getPersonPreviousPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPersonPreviousPage),
      switchMap((_) =>
        this.store.select(selectCurrentPage).pipe(
          first(),
          switchMap((currentPage) => [
            getPersonsByPage({ page: currentPage - 1 }),
          ])
        )
      )
    )
  );

  getPersonById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPersonById),
      switchMap(({ id }) =>
        this.personService.getPersonById(id).pipe(
          switchMap((person) => [getPersonByIdSuccess({ person })]),
          catchError((error) => of(getPersonByIdFailed(error)))
        )
      )
    )
  );
}
