import { Person } from '../person/models/person';
import { SwapiGet } from '../shared/models/swapi';

export const mockPerson: Person = {
  name: 'testName',
  height: 99,
  gender: 'testGender',
  mass: 50,
};

export const mockPersons: Person[] = [mockPerson, mockPerson, mockPerson];

export const mockPersonGetRequest: SwapiGet<Person> = {
  count: 3,
  next: 'nextUrl',
  previous: 'previousUrl',
  results: mockPersons,
};
