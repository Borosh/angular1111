import { createAction, props } from '@ngrx/store';
import { Person } from '@person/models/person';

export const getPersonsByPage = createAction(
  '[Persons] Get persons by page',
  props<{ page: number }>()
);
export const getPersonsByPageSuccess = createAction(
  '[Persons] Get persons by page --success',
  props<{ persons?: Person[]; page: number }>()
);
export const getPersonsByPageFailed = createAction(
  '[Persons] Get persons by page --failed',
  props<{ error: string }>()
);
export const setTotalNumberOfPersons = createAction(
  '[Persons] Set total number of persons',
  props<{ totalNumberOfPersons: number }>()
);
export const getPersonNextPage = createAction(
  '[Persons] Get persons next page'
);
export const getPersonPreviousPage = createAction(
  '[Persons] Get persons previous page'
);
export const getPersonById = createAction(
  '[Persons] Get person by id',
  props<{ id: number }>()
);
export const getPersonByIdSuccess = createAction(
  '[Persons] Get person by id --success',
  props<{ person?: Person }>()
);
export const getPersonByIdFailed = createAction(
  '[Persons] Get person by id --failed',
  props<{ error: string }>()
);
