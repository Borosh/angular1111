import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SwapiGet } from '@shared/models/swapi';
import { Person } from '../models/person';

@Injectable({ providedIn: 'root' })
export class PersonService {
  constructor(private http: HttpClient) {}

  getPersons(page: number = 1) {
    return this.http
      .get<SwapiGet<Person>>(`https://swapi.dev/api/people`, {
        params: {
          page,
        },
      })
      .pipe(
        map((response) => ({
          ...response,
          results: response.results.map((person) => ({
            ...person,
            id: this.getPersonId(person.url),
          })),
        }))
      );
  }

  getPersonsById(id: number) {
    return this.http.get<Person>(`https://swapi.dev/api/people/${id}`, {}).pipe(
      map((person) => ({
        ...person,
        id: this.getPersonId(person.url),
      }))
    );
  }

  private getPersonId = (url: string): number => +url.split('/').slice(-2)[0];
}
