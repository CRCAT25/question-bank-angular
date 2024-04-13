import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../shared/services/module.service';
import { ModuleCategoryDTO } from '../shared/dto/moduleCategory.dto';

@Component({
  selector: 'app-p-navbar',
  templateUrl: './p-navbar.component.html',
  styleUrl: './p-navbar.component.scss'
})
export class PNavbarComponent implements OnInit {
  public moduleCategory: ModuleCategoryDTO[] = [];
  selectedModuleName: string = '';

  constructor(private moduleService: ModuleService) { }

  ngOnInit(): void {
    this.moduleService.selectedModuleName$.subscribe(name => {
      this.selectedModuleName = name;
      this.moduleService.getModuleCategoryByModule(name).subscribe(name => this.moduleCategory = name);
    });
  }
}
