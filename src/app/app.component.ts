import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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

  persons$: Observable<Person[]>;

  constructor(private personService: PersonService) {
    this.persons$ = this.personService.getPersons();
  }
}
