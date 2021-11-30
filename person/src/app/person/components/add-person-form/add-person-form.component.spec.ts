import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonFormComponent } from './add-person-form.component';

describe('AddPersonFormComponent', () => {
  let component: AddPersonFormComponent;
  let fixture: ComponentFixture<AddPersonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPersonFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
