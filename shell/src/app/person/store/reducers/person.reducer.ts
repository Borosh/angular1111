import { createReducer, on } from '@ngrx/store';
import * as PersonActions from '../actions/person.actions';
import { initialPersonState } from '../models/person-state.model';

export const getPersonsReducer = createReducer(
  initialPersonState,
  on(PersonActions.getPersonsByPage, (state, { page }) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
    currentPage: page,
  })),
  on(PersonActions.getPersonsByPageSuccess, (state, { persons, page }) => ({
    ...state,
    loading: false,
    loaded: true,
    currentPage: page,
    entitiesById: {
      ...state.entitiesById,
      ...(persons
        ? persons.reduce(
            (acc, person) => ({
              ...acc,
              [person.id]: person,
            }),
            {}
          )
        : {}),
    },
    entitiesByPage: {
      ...state.entitiesByPage,
      [page]: persons
        ? persons.map(({ id }) => id)
        : state.entitiesByPage[page],
    },
  })),
  on(
    PersonActions.setTotalNumberOfPersons,
    (state, { totalNumberOfPersons }) => ({
      ...state,
      totalNumberOfPersons,
    })
  ),
  on(PersonActions.getPersonById, (state) => ({
    ...state,
    loading: true,
  })),
  on(PersonActions.getPersonByIdSuccess, (state, { person }) => ({
    ...state,
    loading: false,
    loaded: true,
    entitiesById: { ...state.entitiesById, [person.id]: person },
    selectedPersonId: person.id,
  })),
  on(PersonActions.getPersonByIdFailed, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  }))
);
