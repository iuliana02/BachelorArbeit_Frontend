import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesListLandlordComponent } from './properties-list-landlord.component';

describe('PropertiesListLandlordComponent', () => {
  let component: PropertiesListLandlordComponent;
  let fixture: ComponentFixture<PropertiesListLandlordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesListLandlordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesListLandlordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
