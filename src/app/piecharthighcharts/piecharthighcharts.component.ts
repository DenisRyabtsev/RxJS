import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {DataBusService} from '../data-bus.service';
import {AverageValues} from '../AverageValues';


@Component({
  selector: 'app-piecharthighcharts',
  templateUrl: './piecharthighcharts.component.html',
  styleUrls: ['./piecharthighcharts.component.css']
})
export class PiecharthighchartsComponent implements OnInit {

  public energyAvgWeek: AverageValues[];
  private energyAvgWeekValue;
  highcharts = Highcharts;
  chartOptions: any;

  constructor(private readonly dataBusService: DataBusService) {
  }

  ngOnInit(): void {
    this.dataBusService.avgWeek$.subscribe((data) => {
      this.energyAvgWeek = data;
      this.energyAvgWeekValue = this.energyAvgWeek.map(({time, value, day}) => ([time.format('YYYY/MMMM  wo'), +(value / day).toFixed(0)]));
      this.chartOptions = this.getchartOptions(this.energyAvgWeekValue);
    });

  }

  getchartOptions(energyAvgWeekValue) {
    return {
      series: [{
        name: 'energy',
        data: energyAvgWeekValue,
      },],
      chart: {
        type: 'pie',
        zoomType: 'x'
      },
      title: {
        text:
          'average daily electricity by week ',
      },
      credits: {
        enabled: false, // remove logo
      },
    };
  }

}
