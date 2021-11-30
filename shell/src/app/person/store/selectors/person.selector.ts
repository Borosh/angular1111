import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PersonState } from '../models/person-state.model';

export const selectPersonsState = createFeatureSelector<PersonState>('persons');

export const selectPersonsEntities = createSelector(
  selectPersonsState,
  ({ entitiesByPage, currentPage, entitiesById }: PersonState) =>
    entitiesByPage[currentPage]
      ? entitiesByPage[currentPage].map((id) => entitiesById[id])
      : []
);

export const selectPersonById = (id: number) =>
  createSelector(
    selectPersonsState,
    (state: PersonState) => state.entitiesById[id]
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
export const selectSelectedPerson = createSelector(
  selectPersonsState,
  ({ entitiesById, selectedPersonId }: PersonState) =>
    entitiesById[selectedPersonId]
);
