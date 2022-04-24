import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPageNavigationComponent } from './first-page-navigation.component';

describe('FirstPageNavigationComponent', () => {
  let component: FirstPageNavigationComponent;
  let fixture: ComponentFixture<FirstPageNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstPageNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstPageNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
