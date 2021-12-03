import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { getPersonById } from '@person/store/actions/person.actions';

@Injectable({ providedIn: 'root' })
export class PersonDetailsGuard implements CanActivate {
  constructor(private store: Store<any>) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const id = route.params.id;
    this.store.dispatch(getPersonById({ id }));

    return true;
  }
}
