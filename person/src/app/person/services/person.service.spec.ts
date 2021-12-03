import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay, skip } from 'rxjs/operators';
import { mockPersonGetRequest, mockPersons } from 'src/app/testing/mock-perons';
import { PersonService } from './person.service';

describe('PersonService', () => {
  let service: PersonService;

  const mockHttpClient = {
    get: (_: string) => {
      return of(mockPersonGetRequest);
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

  describe('#fetchPersons', () => {
    it('should set loading flag to true', (done) => {
      spyOn(mockHttpClient, 'get').and.returnValue(
        of(mockPersonGetRequest).pipe(delay(2000))
      );

      service.fetchPersons();
      service.loading$.subscribe((loading) => {
        expect(loading).toBeTrue();
        done();
      });
    });
    it('should set loading flag to false', (done) => {
      service.fetchPersons();
      service.loading$.subscribe((loading) => {
        expect(loading).toBeFalse();
        done();
      });
    });
    it('should get persons', (done) => {
      service.persons$.subscribe((persons) => {
        expect(persons).toEqual(mockPersons);
        done();
      });
      service.fetchPersons();
    });
    it('should get totalNumberOfPersons', (done) => {
      service.totalNumberOfPersons$.subscribe((totalNumber) => {
        expect(totalNumber).toEqual(mockPersons.length);
        done();
      });
      service.fetchPersons();
    });
    it('should update totalNumberOfPersons if count changed', (done) => {
      service.totalNumberOfPersons$.pipe(skip(2)).subscribe((totalNumber) => {
        expect(totalNumber).toEqual(6);
        done();
      });
      service.fetchPersons();
      spyOn(mockHttpClient, 'get').and.returnValue(
        of({ ...mockPersonGetRequest, count: 6 })
      );
      service.fetchPersons();
    });
  });

  describe('#getNextPage', () => {
    it('should call http.get with next url', () => {
      service.fetchPersons();
      const spy = spyOn(mockHttpClient, 'get');
      service.getNextPage();
      expect(spy).toHaveBeenCalledWith(mockPersonGetRequest.next);
    });
    it('should overwrite personRequestSubject', (done) => {
      service.fetchPersons();
      spyOn(mockHttpClient, 'get').and.returnValue(
        of({ ...mockPersonGetRequest, results: [] })
      );
      service.getNextPage();
      service.persons$.subscribe((persons) => {
        expect(persons).toEqual([]);
        done();
      });
    });
  });

  describe('#getPreviousPage', () => {
    it('should call http.get with previous url', () => {
      service.fetchPersons();
      const spy = spyOn(mockHttpClient, 'get');
      service.getPreviousPage();
      expect(spy).toHaveBeenCalledWith(mockPersonGetRequest.previous);
    });
    it('should overwrite personRequestSubject', (done) => {
      service.fetchPersons();
      spyOn(mockHttpClient, 'get').and.returnValue(
        of({ ...mockPersonGetRequest, results: [] })
      );
      service.getPreviousPage();
      service.persons$.subscribe((persons) => {
        expect(persons).toEqual([]);
        done();
      });
    });
  });
});
