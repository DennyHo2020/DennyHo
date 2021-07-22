import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParallelCoordinates } from './parallel-coordinates.component';
import { DataVisualizationsRoutingModule } from './data-visualizations-routing.module';

@NgModule({
  declarations: [
    ParallelCoordinates
  ],
  imports: [
    CommonModule,
    DataVisualizationsRoutingModule
  ]
})
export class DataVisualizationsModule { }
