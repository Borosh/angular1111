import { Person } from '@person/models/person';

export interface PersonState {
  entitiesByPage: {
    [pageNumber: number]: Person[];
  };
  error: string;
  loaded: boolean;
  loading: boolean;
  totalNumberOfPersons: number;
  currentPage: number;
}

export const initialPersonState: PersonState = {
  entitiesByPage: {},
  error: null,
  loaded: false,
  loading: false,
  totalNumberOfPersons: 0,
  currentPage: 1,
};
