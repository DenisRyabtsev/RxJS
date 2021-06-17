import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {MomentValue} from '../MomentValue';
import {DataBusService} from '../data-bus.service';


@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.css']
})
export class HighchartsComponent implements OnInit {

  public energyHourlyData: MomentValue[];
  public energyHourlyValue: (number)[][];
  highcharts: typeof Highcharts = Highcharts;
  chartOptions: any;
  private readonly MIN_RANGE = 15 * 2300 * 36000;

  constructor(private readonly dataBusService: DataBusService) {
  }

  ngOnInit(): void {
    this.dataBusService.count$.subscribe((data) => {
      this.energyHourlyData = data;
      this.energyHourlyValue = this.energyHourlyData.map(item => [+item.time, item.value]);
      this.chartOptions = this.getChartOptions(this.energyHourlyValue);
      console.log(this.energyHourlyValue)
    });
  }

  getChartOptions(energyHourlyValue) {
    return {
      series: [{
        name: 'energy days',
        pointInterval: energyHourlyValue,
        data: this.energyHourlyValue,
      },],
      chart: {
        type: 'column',
        zoomType: 'x'
      },
      title: {
        text: 'Energy by day',
      },
      credits: {
        enabled: false, // remove logo
      },

      plotOptions: {series: {dataLabels: {
            enabled: true
          }}},

      xAxis: {
        type: 'datetime',
        minRange: this.MIN_RANGE,
      },
    }
  }
}
