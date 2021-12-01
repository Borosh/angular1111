import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { PersonService } from '../../services/person.service';

import { PersonListComponent } from './person-list.component';
import { provideMockStore } from '@ngrx/store/testing';

fdescribe('PersonListComponent', () => {
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
        {
          provide: Router,
          useValue: {
            navigate: (_: any[], {}: any) => {},
          },
        },
        {
          provide: MatDialog,
          useValue: {
            open: () => ({
              afterClosed: () => of(null),
            }),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
        provideMockStore({ initialState: {} }),
      ],
      schemas: [NO_ERRORS_SCHEMA],
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
