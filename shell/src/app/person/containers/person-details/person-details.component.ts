import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Person } from '@person/models/person';
import { selectSelectPerson } from '@person/store/selectors/person.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss'],
})
export class PersonDetailsComponent implements OnInit {
  person$: Observable<Person>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.person$ = this.store.select(selectSelectPerson);
  }
}
