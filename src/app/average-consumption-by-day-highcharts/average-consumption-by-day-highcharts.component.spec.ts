import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageConsumptionByDayHighchartsComponent } from './average-consumption-by-day-highcharts.component';

describe('AverageConsumptionByDayHighchartsComponent', () => {
  let component: AverageConsumptionByDayHighchartsComponent;
  let fixture: ComponentFixture<AverageConsumptionByDayHighchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageConsumptionByDayHighchartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageConsumptionByDayHighchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
