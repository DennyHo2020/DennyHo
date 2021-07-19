import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './areas/home/home.component';
import { ResumeComponent } from './areas/resume/resume.component';

const routes: Routes = [
  {
    path: '', component : HomeComponent
  },
  {
    path: 'resume', component: ResumeComponent
  },
  {
    path: 'projects', loadChildren: () => import('./areas/projects/projects.module').then(m => m.ProjectsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
