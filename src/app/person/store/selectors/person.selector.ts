import { createSelector } from '@ngrx/store';
import { PersonState } from '../models/person-state.model';

export interface AppState {
  personReducer: PersonState;
}

export const selectPersonsState = (state: AppState) => state.personReducer;

export const selectPersonsEntities = createSelector(
  selectPersonsState,
  ({ entitiesByPage, currentPage }: PersonState) =>
    entitiesByPage[currentPage] ?? []
);
export const selectPersonsLoading = createSelector(
  selectPersonsState,
  (state: PersonState) => state.loading
);
export const selectPersonsLoaded = createSelector(
  selectPersonsState,
  (state: PersonState) => state.loaded
);
export const selectPersonsError = createSelector(
  selectPersonsState,
  (state: PersonState) => state.error
);
export const selectTotalNumberOfPersons = createSelector(
  selectPersonsState,
  (state: PersonState) => state.totalNumberOfPersons
);
export const selectCurrentPage = createSelector(
  selectPersonsState,
  (state: PersonState) => state.currentPage
);
