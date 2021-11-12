import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilKeyChanged, first, map, switchMap } from 'rxjs/operators';
import { SwapiGet } from 'src/app/shared/models/swapi';
import { Person } from '../models/person';

@Injectable({ providedIn: 'root' })
export class PersonService {
  private personRequestSubject = new ReplaySubject<SwapiGet<Person>>(1);
  private totalNumberOfPersons = new ReplaySubject<number>(1);
  private loadingSubject = new ReplaySubject<boolean>(1);

  constructor(private http: HttpClient) {}

  fetchPersons(): void {
    this.loadingSubject.next(true);
    this.personRequestSubject
      .pipe(
        distinctUntilKeyChanged('count'),
        map(({ count }) => count)
      )
      .subscribe(this.totalNumberOfPersons);

    this.http
      .get<SwapiGet<Person>>('/api/people')
      // .pipe(delay(3000))
      .subscribe((response) => {
        this.personRequestSubject.next(response);
        this.loadingSubject.next(false);
      });
  }

  get totalNumberOfPersons$(): Observable<number> {
    return this.totalNumberOfPersons.asObservable();
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
        //   delay(4000),
        switchMap((url) => this.http.get<SwapiGet<Person>>(url))
      )
      .subscribe((request) => {
        this.loadingSubject.next(false);
        this.personRequestSubject.next(request);
      });
  }
}
