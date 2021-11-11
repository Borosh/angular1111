import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
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
  totalNumberOfPages$: Observable<number>;
  loading$: Observable<boolean>;

  firstLoaded = false;
  currentPage = 1;

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.personService.fetchPersons();
    this.persons$ = this.personService.persons$;
    this.totalNumberOfPages$ = this.personService.totalNumberOfPages$;
    this.loading$ = this.personService.loading$;

    this.personService.loading$
      .pipe(filter((loading) => !loading))
      .subscribe((_) => (this.firstLoaded = true));
  }

  onPageChanged(page: number) {
    page > this.currentPage
      ? this.personService.getNextPage()
      : this.personService.getPreviousPage();

    this.currentPage = page;
  }
}
