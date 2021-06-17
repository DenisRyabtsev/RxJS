import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {RangeValues} from './datepicker/datepicker.component';

@Injectable( )
export class DataBusService {
  constructor() {
  }
  public count$ = new Subject<any>();
  public avgWeek$ = new Subject<any>();
  public avgWeekDays$ = new Subject<any>();
  public datePicker$ = new Subject<any>();


  public pushValueHourly(data: any[]) {
    this.count$.next(data);
  }
  public pushAvgWeek(data: any[]) {
    this.avgWeek$.next(data);
  }
  public pushAvgWeekDays(data: any[]) {
    this.avgWeekDays$.next(data);
  }
  public pushDatePicker(data: RangeValues) {
    this.datePicker$.next(data);
  }

}
