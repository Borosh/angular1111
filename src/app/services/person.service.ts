import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { Person } from '../models/person';

interface SwapiGet<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

@Injectable({ providedIn: 'root' })
export class PersonService {
  private personRequestSubject = new ReplaySubject<SwapiGet<Person>>(1);

  constructor(private http: HttpClient) {}

  fetchPersons(): void {
    this.http
      .get<SwapiGet<Person>>('https://swapi.dev/api/people')
      .subscribe((response) => {
        this.personRequestSubject.next(response);
      });
  }

  getPersons(): Observable<Person[]> {
    return this.personRequestSubject.pipe(map((response) => response.results));
  }

  getNextPage() {
    this.personRequestSubject
      .pipe(
        first(),
        map(({ next }) => next),
        switchMap((url) => this.http.get<SwapiGet<Person>>(url))
      )
      .subscribe((request) => {
        this.personRequestSubject.next(request);
      });
  }
}
