import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay, skip } from 'rxjs/operators';
import { PersonService } from './person.service';

describe('PersonService', () => {
  let service: PersonService;

  const mockHttpClient = {
    get: (_: string) => {
      return of();
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: mockHttpClient,
        },
      ],
    });
    service = TestBed.inject(PersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
