import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { PersonService } from '../services/person.service';

@Injectable({ providedIn: 'root' })
export class PersonGuard implements CanActivate {
  constructor(private personService: PersonService) {}

  canActivate(): boolean {
    this.personService.fetchPersons();

    return true;
  }
}
