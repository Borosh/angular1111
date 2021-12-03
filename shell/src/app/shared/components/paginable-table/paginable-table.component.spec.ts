import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginableTableComponent } from './paginable-table.component';

describe('PaginableTableComponent', () => {
  let component: PaginableTableComponent;
  let fixture: ComponentFixture<PaginableTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginableTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
