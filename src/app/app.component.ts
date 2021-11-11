import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ColDef } from './components/table/table.component';
import { Person } from './models/person';
import { PersonService } from './services/person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  colDefs: ColDef[] = [
    { header: 'Name', key: 'name' },
    { header: 'Height', key: 'height' },
    { header: 'Mass', key: 'mass' },
    { header: 'Gender', key: 'gender' },
  ];

  persons$: Observable<Person[]>;

  currentPage = 1;

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.personService.fetchPersons();
    this.persons$ = this.personService.getPersons();
  }

  onPageChanged(page: number) {
    if (page > this.currentPage) {
      this.personService.getNextPage();
    }
  }
}
