import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectPersonById } from '@person/store';
import { getPersonById, setSelectedPersonById } from '@person/store/actions';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PersonDetailGuard implements CanActivate {
  constructor(private store: Store<any>) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const id = route.params.id;
    this.store.dispatch(getPersonById({ id }));
    this.store
      .select(selectPersonById(id))
      .pipe(first())
      .subscribe((_) => {
        this.store.dispatch(setSelectedPersonById({ id }));
      });

    return true;
  }
}
