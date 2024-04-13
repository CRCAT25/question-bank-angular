import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../shared/services/module.service';
import { ModuleDTO } from '../shared/dto/module.dto';

@Component({
  selector: 'app-p-header',
  templateUrl: './p-header.component.html',
  styleUrl: './p-header.component.scss'
})
export class PHeaderComponent implements OnInit {
  public modules: ModuleDTO[] = [];

  constructor(private moduleService: ModuleService){ }
  ngOnInit(): void {
    this.moduleService.getModules().subscribe(module => this.modules = module);
  }
  
  onModuleClick(nameModule: string): void {
    this.moduleService.setSelectedModuleName(nameModule);
  }
}