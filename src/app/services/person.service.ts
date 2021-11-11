import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import {
  distinctUntilKeyChanged,
  first,
  map,
  shareReplay,
  switchMap,
} from 'rxjs/operators';
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
  private totalNumberOfPagesSubject = new ReplaySubject<number>(1);
  private limit = 10;

  constructor(private http: HttpClient) {}

  fetchPersons(): void {
    this.personRequestSubject
      .pipe(
        distinctUntilKeyChanged('count'),
        map((request) => Math.ceil(request.count / this.limit), shareReplay(1))
      )
      .subscribe(this.totalNumberOfPagesSubject);

    this.http
      .get<SwapiGet<Person>>('https://swapi.dev/api/people')
      .subscribe((response) => {
        this.personRequestSubject.next(response);
      });
  }

  get totalNumberOfPages$(): Observable<number> {
    return this.totalNumberOfPagesSubject.asObservable();
  }

  getPersons(): Observable<Person[]> {
    return this.personRequestSubject.pipe(map((response) => response.results));
  }

  getNextPage() {
    this.getRequestByPreviousRequstKey('next');
  }

  getPreviousPage() {
    this.getRequestByPreviousRequstKey('previous');
  }

  private getRequestByPreviousRequstKey(key: 'next' | 'previous') {
    this.personRequestSubject
      .pipe(
        first(),
        map((request) => request[key]),
        switchMap((url) => this.http.get<SwapiGet<Person>>(url))
      )
      .subscribe((request) => {
        this.personRequestSubject.next(request);
      });
  }
}
