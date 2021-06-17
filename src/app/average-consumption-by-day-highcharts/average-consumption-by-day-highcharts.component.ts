import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {DataBusService} from '../data-bus.service';
import {AverageValues} from '../AverageValues';


@Component({
  selector: 'app-average-consumption-by-day-highcharts',
  templateUrl: './average-consumption-by-day-highcharts.component.html',
  styleUrls: ['./average-consumption-by-day-highcharts.component.css']
})
export class AverageConsumptionByDayHighchartsComponent implements OnInit {

  public energyAvgWeekDays: AverageValues[];
  public energyAvgWeekDayValue;
  highcharts = Highcharts;
  chartOptions: any;

  constructor(private readonly dataBusService: DataBusService) {
  }

  ngOnInit(): void {
    this.dataBusService.avgWeekDays$.subscribe((data) => {
      this.energyAvgWeekDays = data;
      this.energyAvgWeekDayValue = this.energyAvgWeekDays.map(({
                                                                 time,
                                                                 value,
                                                                 day
                                                               }) => ([time.format('YYYY/MMMM dddd'), +(value / day).toFixed(0)]));
      this.chartOptions = this.getChartOptions(this.energyAvgWeekDayValue);
      console.log('h', this.energyAvgWeekDayValue);
    });
  }

  getChartOptions(energyAvgWeekDayValue) {
    return {
      series: [{
        name: 'energy',
        data: energyAvgWeekDayValue,
      },],
      chart: {
        type: 'pie',
        zoomType: 'x'
      },
      title: {
        text:
          'average electrical energy by day of the week',
      },
      credits: {
        enabled: false, // remove logo
      },
    };
  }
}
