import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PersonService } from '../../services/person.service';

import { PersonListComponent } from './person-list.component';

describe('PersonListComponent', () => {
  let component: PersonListComponent;
  let fixture: ComponentFixture<PersonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonListComponent],
      providers: [
        {
          provide: PersonService,
          useValue: {
            persons$: of([]),
            totalNumberOfPersons$: of(0),
            loading$: of(false),
            getNextPage: () => {},
            getPreviousPage: () => {},
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
