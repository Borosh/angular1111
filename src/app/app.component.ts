import { Component } from '@angular/core';
import { ColDef } from './components/table/table.component';
import { Person } from './models/person';
import { PersonService } from './services/person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  colDefs: ColDef[] = [
    { header: 'Name', key: 'name' },
    { header: 'Height', key: 'height' },
    { header: 'Mass', key: 'mass' },
    { header: 'Gender', key: 'gender' },
  ];
  persons: Person[] = [
    {
      name: 'Luke Skywalker',
      height: 172,
      mass: 77,
      gender: 'male',
    },
    {
      name: 'Luke Skywalker1',
      height: 172,
      mass: 77,
      gender: 'male',
    },
    {
      name: 'Luke Skywalker2',
      height: 172,
      mass: 77,
      gender: 'male',
    },
  ];

  constructor(private personService: PersonService) {
    this.personService.getPersons();
  }
}
