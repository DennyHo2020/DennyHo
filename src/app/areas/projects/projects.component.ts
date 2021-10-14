import { Component, OnInit } from '@angular/core';
import { ProjectModel } from './project.model';
import {Router} from '@angular/router';
import { projectsList } from './projects';

@Component({
  selector: 'app-projects',
  templateUrl: '/projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

    public projects = projectsList;

    constructor(private router: Router) { 
      
    }

    ngOnInit(): void {
    }

    public navigate(project: ProjectModel) {
      var link = project.demoLink != "" ? project.demoLink : project.codeLink;

      if (project.isExternalDemo) {
        window.open(link, "_blank");
      }
      else {
        this.router.navigateByUrl(link);
      }
    }

    public openCodeLink(project: ProjectModel) {
      window.open(project.codeLink, "_blank");
    }

    public openDemoLink(project: ProjectModel) {
      this.router.navigateByUrl(project.demoLink);
    }

    public hasLink(project: ProjectModel): boolean {
      if (project.codeLink != "" || project.demoLink != "") {
        return true;
      }
      
      return false;
    }
}
