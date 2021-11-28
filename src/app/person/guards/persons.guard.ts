import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { getPersonsByPage } from '@person/store/actions';

@Injectable({ providedIn: 'root' })
export class PersonsGuard implements CanActivate {
  constructor(private store: Store<any>) {}

  canActivate(): boolean {
    this.store.dispatch(getPersonsByPage({ page: 1 }));

    return true;
  }
}
