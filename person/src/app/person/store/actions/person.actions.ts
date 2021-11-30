import { createAction, props } from '@ngrx/store';
import { Person } from '@person/models/person';

export const getPersonsByPage = createAction(
  '[Person] Get persons',
  props<{ page: number }>()
);
export const getPersonsSuccess = createAction(
  '[Person] Get persons --success',
  props<{ persons: Person[] }>()
);
export const getPersonsFailed = createAction(
  '[Person] Get persons --failed',
  props<{ error: string }>()
);
export const getPersonsNextPage = createAction(
  '[Person] Get persons next page'
);
export const getPersonsPreviousPage = createAction(
  '[Person] Get persons previous page'
);

export const setTotalNumerOfPersons = createAction(
  '[Person] Set total number of persons',
  props<{ totalNumberOfPersons: number }>()
);

export const getPersonById = createAction(
  '[Person] Get person by id',
  props<{ id: number }>()
);
export const getPersonByIdSuccess = createAction(
  '[Person] Get person by id --success',
  props<{ person: Person }>()
);
export const getPersonByIdFailed = createAction(
  '[Person] Get person by id --failed',
  props<{ error: string }>()
);
export const setSelectedPersonById = createAction(
  '[Person] Set selected person by id',
  props<{ id: number }>()
);
