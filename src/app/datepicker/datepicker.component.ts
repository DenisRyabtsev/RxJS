import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {JsonData} from '../JsonData';
import {DaterangepickerComponent} from 'ng2-daterangepicker';
import {DataBusService} from '../data-bus.service';

export interface RangeValues {
  start?: any; end?: any;
};

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  @Input() meterData: JsonData;
  // @Output() SelectedInterval = new EventEmitter();
  @ViewChild(DaterangepickerComponent)
  private picker: DaterangepickerComponent;
  public daterange: RangeValues = {};

  constructor(private dataBusService: DataBusService) {
  }

  ngOnInit(): void {
  }

  // pushValue() {
  //   this.SelectedInterval.emit(this.daterange);
  // }

  public options: any = {
    locale: {format: 'YYYY-MM-DD HH:mm'},
    alwaysShowCalendars: false,
    timePicker: true,
    timePicker24Hour: true,
    timePickerIncrement: 15,
  };

  public selectedDateJson(value: any) {
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.dataBusService.pushDatePicker(this.daterange);
  }

  resetDate1() {
    this.picker.datePicker.setStartDate(moment(+this.meterData.firstRecord));
    this.picker.datePicker.setEndDate(moment(+this.meterData.lastRecord));
  }

}
