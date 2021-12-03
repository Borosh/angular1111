import { Person } from '@person/models/person';

export interface PersonState {
  loading: boolean;
  loaded: boolean;
  error: string;
  totalNumberOfPersons: number;
  entitiesById: {
    [id: number]: Person;
  };
  entitiesByPage: {
    [pageNumber: number]: number[];
  };
  currentPage: number;
  selectedPersonId: number;
}

export const initialPersonState: PersonState = {
  loading: false,
  loaded: false,
  error: null,
  totalNumberOfPersons: 0,
  entitiesById: {},
  entitiesByPage: {},
  currentPage: 1,
  selectedPersonId: null,
};
