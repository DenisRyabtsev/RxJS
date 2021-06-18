import {Component, OnInit} from '@angular/core';
import {MomentValue} from './MomentValue';
import {JsonService} from './json.service';
import * as moment from 'moment';
import {JsonData} from './JsonData';
import {RangeValues} from './datepicker/datepicker.component';
import {DataBusService} from './data-bus.service';
import {AverageValues} from './AverageValues';
import {Subject} from 'rxjs';


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public callNumber = 1;
  private updatedAr: MomentValue[];
  private energyData: MomentValue[];
  private updatedValueHourly: MomentValue[];
  public updatedValueDay: MomentValue[];
  public updatedValueWeek: MomentValue[];
  public updatedValueWeekDay: MomentValue[];
  meterData: JsonData;
  avgHourly: number;
  sotrEnergyHourly;
  sotrEnergyDaily;
  public daterange: RangeValues = {};
  calculateAvgHour$ = new Subject();
  getMaximumHour$ = new Subject();
  getMinimumDay$ = new Subject();

  constructor(private jsonService: JsonService,
              private dataBusService: DataBusService) {
  }

  ngOnInit(): void {
  }

  private parseEnergyData(data: JsonData): MomentValue[] {
    return data.recordValues.map(keyValuePair => new MomentValue(moment(+keyValuePair.Key), keyValuePair.Value));
  }

  getData() {
    this.jsonService.getData().subscribe(jsondata => {
      if (jsondata.length > 0) {
        this.meterData = jsondata[0];
        this.energyData = this.parseEnergyData(this.meterData);
        this.dataBusService.pushValueHourly(this.wrapToDayData());
        this.dataBusService.pushAvgWeek(this.calculateAvgWeek());
        this.dataBusService.pushAvgWeekDays(this.wrapToWeekDayData());
        this.calculateAvgHour$.next(this.calculateAvgHourly());
        this.getMaximumHour$.next(this.getMaximumHour());
        this.getMinimumDay$.next(this.getMinimumDay());
      }
    });
    this.dataBusService.datePicker$.subscribe((data) => {
      console.log(this.daterange);
      this.getSelectedInterval(data);
    });
  }

  getSelectedInterval(daterang: RangeValues) {
    this.daterange.start = daterang.start;
    this.daterange.end = daterang.end;
    this.dataBusService.pushValueHourly(this.wrapToDayData());
    this.dataBusService.pushAvgWeek(this.calculateAvgWeek());
    this.dataBusService.pushAvgWeekDays(this.wrapToWeekDayData());
    this.calculateAvgHour$.next(this.calculateAvgHourly());
    this.getMaximumHour$.next(this.getMaximumHour());
    this.getMinimumDay$.next(this.getMinimumDay());
  }

  private sortValuesInterval(): MomentValue[] {
    let dataStart;
    let dataEnd;
    if (this.daterange.start && this.daterange.end) {
      dataStart = this.daterange.start,
        dataEnd = this.daterange.end;
    } else {
      dataStart = moment(+this.meterData.firstRecord),
        dataEnd = moment(+this.meterData.lastRecord);
    }
    this.updatedAr = this.energyData.filter((item) => {
      return item.time >= dataStart && item.time <= dataEnd;
    });
    return this.updatedAr;
  }

  public wrapToHourlyData(): MomentValue[] {
    this.updatedValueHourly = this.sortValuesInterval().reduce((acc: any, curr: any) => {
      const date = curr.time;
      const findElement = acc.find((item) => {
        return (
          item.time.hour() === date.hour() &&
          item.time.date() === date.date()
        );
      });

      if (findElement) {
        findElement.value += curr.value;
      } else {
        acc.push({
          time: curr.time,
          value: curr.value,
        });
      }
      return acc;
    }, []);

    return this.updatedValueHourly;
  }


  private wrapToDayData(): MomentValue[] {
    this.updatedValueDay = this.sortValuesInterval().reduce((acc: any, curr: any) => {
      const date = curr.time;
      const findElement = acc.find((item) => {
        return (
          item.time.date() === date.date()
        );
      });

      if (findElement) {
        findElement.value += curr.value;
      } else {
        acc.push({
          time: curr.time,
          value: curr.value,
        });
      }
      return acc;
    }, []);
    return this.updatedValueDay;
  }

  private wrapToWeekData(): AverageValues[] {

    this.updatedValueWeek = this.wrapToDayData().reduce((acc: any, curr: any) => {
      curr.day = 1;
      const date = curr.time;
      const findElement = acc.find((item) => {
        return (
          item.time.date() === date.date(),
          item.time.week() === date.week()
        );
      });

      if (findElement) {
        // debugger;
        findElement.value += curr.value;
        findElement.day++;
      } else {
        acc.push({
          time: curr.time,
          value: curr.value,
          day: curr.day
        });

      }
      return acc;
    }, []);
    return this.updatedValueWeek;
  }

  private wrapToWeekDayData(): AverageValues[] {

    this.updatedValueWeekDay = this.wrapToDayData().reduce((acc: any, curr: any) => {
      curr.day = 1;
      const date = curr.time;
      const findElement = acc.find((item) => {
        return (
          item.time.weekday() === date.weekday()
        );
      });

      if (findElement) {
        // debugger;
        findElement.value += curr.value;
        findElement.day++;
      } else {
        acc.push({
          time: curr.time,
          value: curr.value,
          day: curr.day
        });

      }
      return acc;
    }, []);
    return this.updatedValueWeekDay;
  }

  calculateAvgWeek() {
    return this.wrapToWeekData();
  }

  getMaximumHour() {
    this.sotrEnergyHourly = this.wrapToHourlyData().sort((a, b) => b.value - a.value);
    return this.sotrEnergyHourly[0].time.format('hh:mm LL');
  }

  getMinimumDay() {
    this.sotrEnergyDaily = this.wrapToDayData().sort((a, b) => a.value - b.value);
    return this.sotrEnergyDaily[0].time.format('LL');
  }

  calculateAvgHourly() {
    this.wrapToHourlyData();
    let sum = 0;
    for (const point of this.updatedValueHourly) {
      sum += point.value;
    }
    return this.avgHourly = sum / this.updatedValueHourly.length;
  }
}
