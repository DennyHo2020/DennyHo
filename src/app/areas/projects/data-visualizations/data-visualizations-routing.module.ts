import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { ParallelCoordinates } from './parallel-coordinates.component';

const routes: Routes = [
    {
        path: 'parallelcoordinates', component: ParallelCoordinates
    },
    {
      path: '**', component : HomeComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataVisualizationsRoutingModule { }
