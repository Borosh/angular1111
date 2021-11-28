import { createAction, props } from '@ngrx/store';
import { Person } from '@person/models/person';

export const getPersonsByPage = createAction(
  '[Perons] Get persons',
  props<{ page: number }>()
);
export const getPersonsNextPage = createAction(
  '[Perons] Get persons next page'
);
export const getPersonsPreviousPage = createAction(
  '[Perons] Get persons previous page'
);
export const getPersonsSuccess = createAction(
  '[Perons] Get persons --success',
  props<{ persons: Person[] }>()
);
export const getPersonsFailed = createAction(
  '[Perons] Get persons --failed',
  props<{ error: string }>()
);

export const setTotalNumerOfPersons = createAction(
  '[Perons] Set total number of persons',
  props<{ totalNumberOfPersons: number }>()
);
