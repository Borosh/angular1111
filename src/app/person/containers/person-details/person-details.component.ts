import { Component, OnInit } from '@angular/core';
import { Person } from '@person/models/person';
import { mockPerson } from '@testing/mock-perons';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss'],
})
export class PersonDetailsComponent implements OnInit {
  person$: Observable<Person>;

  constructor() {}

  ngOnInit(): void {
    this.person$ = of(mockPerson);
  }
}
