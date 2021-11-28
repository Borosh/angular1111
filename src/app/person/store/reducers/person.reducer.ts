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
      [state.currentPage]: action.persons,
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
  )
);
