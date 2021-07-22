import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { SortingComponent } from './sorting/sorting.component';

const routes: Routes = [
    {
        path: 'sorting', component: SortingComponent
    },
    {
      path: 'data-visualizations', loadChildren: () => import('./data-visualizations/data-visualizations.module').then(m => m.DataVisualizationsModule)
    },
    {
      path: '**', component : HomeComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
