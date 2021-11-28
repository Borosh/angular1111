import { createReducer, on } from '@ngrx/store';
import * as PersonActions from '../actions/person.actions';
import { initialPersonState } from '../models/person-state.model';

export const getPersonsReducer = createReducer(
  initialPersonState,
  on(PersonActions.getPersonsByPage, (state, { page }) => ({
    ...state,
    loading: true,
    currentPage: page,
  })),
  on(PersonActions.getPersonsFailed, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(PersonActions.getPersonsSuccess, (state, action) => ({
    ...state,
    error: null,
    entitiesByPage: {
      ...state.entitiesByPage,
      [state.currentPage]: action.persons.map(({ id }) => id),
    },
    entitiesById: {
      ...state.entitiesById,
      ...action.persons.reduce(
        (acc, person) => ({
          ...acc,
          [person.id]: person,
        }),
        {}
      ),
    },
    loading: false,
    loaded: true,
  })),
  on(
    PersonActions.setTotalNumerOfPersons,
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
  })),
  on(PersonActions.getPersonByIdFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(PersonActions.setSelectedPersonById, (state, { id }) => ({
    ...state,
    selectedPersonId: id,
  }))
);
