import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';
import { PersonService } from '../services/person.service';

@Injectable({ providedIn: 'root' })
export class PersonGuard implements CanActivate {
  constructor(private personService: PersonService) {}

  canActivate(): Observable<boolean> {
    this.personService.fetchPersons();
    return this.personService.loading$.pipe(
      filter((loading) => !loading),
      mapTo(true)
    );
  }
}
