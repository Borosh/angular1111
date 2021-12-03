import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PersonState } from '../models/person-state.model';

export const selectPersonState = createFeatureSelector<PersonState>('persons');

export const selectPersons = createSelector(
  selectPersonState,
  ({ entitiesByPage, currentPage, entitiesById }) =>
    entitiesByPage[currentPage]
      ? entitiesByPage[currentPage].map((id) => entitiesById[id])
      : []
);

export const selectEntitiesByPage = (page: number) =>
  createSelector(
    selectPersonState,
    ({ entitiesByPage }) => entitiesByPage[page]
  );

// export const selectPersons = createSelector(selectPersonState, (state) => []);
export const selectTotalNumberOfPersons = createSelector(
  selectPersonState,
  (state) => state.totalNumberOfPersons
);
export const selectLoading = createSelector(
  selectPersonState,
  (state) => state.loading
);
export const selectLoaded = createSelector(
  selectPersonState,
  (state) => state.loaded
);
export const selectCurrentPage = createSelector(
  selectPersonState,
  (state) => state.currentPage
);
export const selectSelectPerson = createSelector(
  selectPersonState,
  (state) => state.entitiesById[state.selectedPersonId]
);
