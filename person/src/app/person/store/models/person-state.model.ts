import { Person } from '@person/models/person';

export interface PersonState {
  entitiesByPage: {
    [pageNumber: number]: number[];
  };
  entitiesById: {
    [id: number]: Person;
  };
  error: string;
  loaded: boolean;
  loading: boolean;
  totalNumberOfPersons: number;
  currentPage: number;
  selectedPersonId: number;
}

export const initialPersonState: PersonState = {
  entitiesByPage: {},
  entitiesById: {},
  error: null,
  loaded: false,
  loading: false,
  totalNumberOfPersons: 0,
  currentPage: 1,
  selectedPersonId: null,
};
