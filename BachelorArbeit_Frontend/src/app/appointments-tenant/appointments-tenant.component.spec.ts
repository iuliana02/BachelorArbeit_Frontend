import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsTenantComponent } from './appointments-tenant.component';

describe('AppointmentsTenantComponent', () => {
  let component: AppointmentsTenantComponent;
  let fixture: ComponentFixture<AppointmentsTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentsTenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
