import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Person } from '@person/models/person';
import { selectPersonsLoading, selectSelectedPerson } from '@person/store';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss'],
})
export class PersonDetailsComponent implements OnInit {
  person$: Observable<Person>;
  personLoading$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.person$ = this.store.select(selectSelectedPerson);
    this.personLoading$ = this.store.select(selectPersonsLoading);
  }
}
