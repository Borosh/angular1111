import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { getPersonsByPage } from '@shared/store/person-store/actions/person.actions';
import { PersonService } from '../services/person.service';

@Injectable({ providedIn: 'root' })
export class PersonGuard implements CanActivate {
  constructor(private store: Store<any>) {}

  canActivate(): boolean {
    this.store.dispatch(getPersonsByPage({ page: 1 }));

    return true;
  }
}
