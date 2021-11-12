import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import {
  delay,
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
  private limit = 10;
  private personRequestSubject = new ReplaySubject<SwapiGet<Person>>(1);
  private totalNumberOfPagesSubject = new ReplaySubject<number>(1);
  private loadingSubject = new ReplaySubject<boolean>(1);

  constructor(private http: HttpClient) {}

  fetchPersons(): void {
    this.loadingSubject.next(true);
    this.personRequestSubject
      .pipe(
        distinctUntilKeyChanged('count'),
        map((request) => Math.ceil(request.count / this.limit), shareReplay(1))
      )
      .subscribe(this.totalNumberOfPagesSubject);

    this.http
      .get<SwapiGet<Person>>('/api/people')
      .pipe(delay(3000))
      .subscribe((response) => {
        this.personRequestSubject.next(response);
        this.loadingSubject.next(false);
      });
  }

  get totalNumberOfPages$(): Observable<number> {
    return this.totalNumberOfPagesSubject.asObservable();
  }

  get persons$(): Observable<Person[]> {
    return this.personRequestSubject.pipe(map((response) => response.results));
  }

  get loading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  getNextPage() {
    this.getRequestByPreviousRequstKey('next');
  }

  getPreviousPage() {
    this.getRequestByPreviousRequstKey('previous');
  }

  private getRequestByPreviousRequstKey(key: 'next' | 'previous') {
    this.loadingSubject.next(true);
    this.personRequestSubject
      .pipe(
        first(),
        map((request) => request[key]),
        delay(4000),
        switchMap((url) => this.http.get<SwapiGet<Person>>(url))
      )
      .subscribe((request) => {
        this.loadingSubject.next(false);
        this.personRequestSubject.next(request);
      });
  }
}
