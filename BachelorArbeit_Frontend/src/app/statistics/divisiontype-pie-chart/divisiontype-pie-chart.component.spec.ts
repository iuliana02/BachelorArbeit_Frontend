import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisiontypePieChartComponent } from './divisiontype-pie-chart.component';

describe('DivisiontypePieChartComponent', () => {
  let component: DivisiontypePieChartComponent;
  let fixture: ComponentFixture<DivisiontypePieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisiontypePieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisiontypePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
