import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortingComponent } from './sorting/sorting.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    SortingComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
