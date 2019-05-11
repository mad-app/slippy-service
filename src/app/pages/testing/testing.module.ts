import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ThemeModule } from '../../@theme/theme.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ChartModule } from 'angular2-chartjs';

import { ApiService } from '../../@core/services';
import { MaterialModule } from '../../@core/modules/material.module'; 

import { TestingComponent } from './testing.component';


@NgModule({
  imports: [
    ThemeModule,
    ChartModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
    MaterialModule,
  ],
  declarations: [
    TestingComponent
  ],
  providers: [
    ApiService,
  ],
})
export class TestingModule { }
