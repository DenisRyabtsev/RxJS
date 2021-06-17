import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HelloComponent} from './hello.component';
import {JsonService} from './json.service';
import {Daterangepicker} from 'ng2-daterangepicker';
import {DatepickerComponent} from './datepicker/datepicker.component';
import {RxjsComponent} from './rxjs/rxjs.component';
import {HighchartsComponent} from './highcharts/highcharts.component';
import {HighchartsChartModule} from 'highcharts-angular';
import {DataBusService} from './data-bus.service';
import {PiecharthighchartsComponent} from './piecharthighcharts/piecharthighcharts.component';
import { AverageConsumptionByDayHighchartsComponent } from './average-consumption-by-day-highcharts/average-consumption-by-day-highcharts.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Daterangepicker,
    HighchartsChartModule

  ],
  declarations: [AppComponent, HelloComponent, DatepickerComponent, RxjsComponent, HighchartsComponent, PiecharthighchartsComponent, AverageConsumptionByDayHighchartsComponent ],
  providers: [
    JsonService, DatepickerComponent, DataBusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
