import {Component, Input, OnChanges, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {DataBusService} from '../data-bus.service';
import {AverageValues} from '../AverageValues';


@Component({
  selector: 'app-piecharthighcharts',
  templateUrl: './piecharthighcharts.component.html',
  styleUrls: ['./piecharthighcharts.component.css']
})
export class PiecharthighchartsComponent implements OnInit, OnChanges {


  @Input() energyValue;
  @Input() title;
  highcharts = Highcharts;
  chartOptions: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.chartOptions = this.getchartOptions(this.energyValue);
  }

  getchartOptions(energyValue) {
    return {
      series: [{
        name: 'energy',
        data: energyValue,
      },],
      chart: {
        type: 'pie',
        zoomType: 'x'
      },
      title: {
        text: this.title,
      },
      credits: {
        enabled: false, // remove logo
      },
    };
  }

}
