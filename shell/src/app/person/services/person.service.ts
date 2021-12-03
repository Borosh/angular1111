import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilKeyChanged, first, map, switchMap } from 'rxjs/operators';
import { SwapiGet } from '@shared/models/swapi';
import { Person } from '../models/person';

@Injectable({ providedIn: 'root' })
export class PersonService {
  private personRequestSubject = new ReplaySubject<SwapiGet<Person>>(1);
  private totalNumberOfPersons = new ReplaySubject<number>(1);
  private loadingSubject = new ReplaySubject<boolean>(1);

  constructor(private http: HttpClient) {}

  getPersons(page: number = 1): Observable<SwapiGet<Person>> {
    return this.http
      .get<SwapiGet<Person>>('/api/people', {
        params: {
          page,
        },
      })
      .pipe(
        map((response) => ({
          ...response,
          results: response.results.map((result) => ({
            ...result,
            id: this.getPersonId(result.url),
          })),
        }))
      );
  }

  getPersonById(id: number) {
    return this.http
      .get<Person>(`/api/people/${id}`)
      .pipe(map((person) => ({ ...person, id: +id })));
  }

  private getPersonId = (url: string): number => +url.split('/').slice(-2)[0];

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
