import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person } from '../models/person';

interface SwapiGet<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

@Injectable({ providedIn: 'root' })
export class PersonService {
  constructor(private http: HttpClient) {}

  getPersons(): Observable<Person[]> {
    return this.http
      .get<SwapiGet<Person>>('https://swapi.dev/api/people')
      .pipe(map((response) => response.results));
  }
}
