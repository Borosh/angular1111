import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PersonService {
  constructor(private http: HttpClient) {}

  getPersons() {
    this.http
      .get('https://swapi.dev/api/people')
      .subscribe((a) => console.log(a));
  }
}
