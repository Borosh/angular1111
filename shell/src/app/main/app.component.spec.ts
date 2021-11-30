import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            navigateByUrl: (path: string) => {},
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onMenuClick', () => {
    it('should toggle isSidenavOpen', () => {
      component.isSidenavOpened = false;
      component.onMenuClick();
      expect(component.isSidenavOpened).toBeTrue();
    });
  });
  describe('#navigateTo', () => {
    it('should call navigateByUrl', () => {
      const path = '#/#/#';
      const navigateToSpy = spyOn(component, 'navigateTo');
      component.navigateTo(path);
      expect(navigateToSpy).toHaveBeenCalledWith(path);
    });
  });
});
