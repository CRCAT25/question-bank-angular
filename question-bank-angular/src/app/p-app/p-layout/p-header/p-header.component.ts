import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../shared/services/module.service';
import { ModuleDTO } from '../shared/dto/module.dto';

@Component({
  selector: 'app-p-header',
  templateUrl: './p-header.component.html',
  styleUrls: ['./p-header.component.scss']
})
export class PHeaderComponent implements OnInit {
  public modules: ModuleDTO[] = [];
  public activeModules: { [key: string]: boolean } = {};
  public itemActive = '';

  constructor(private moduleService: ModuleService) { }

  ngOnInit(): void {
    this.moduleService.getModules().subscribe(modules => this.modules = modules);
  }

  // Thực hiện khi click vào Module bất kỳ
  onModuleClick(nameModule: string): void {
    this.itemActive = nameModule;
    this.moduleService.setSelectedModuleName(nameModule);
  }

  // Kiểm tra xem Module có đang được active hay không
  isModuleActive(nameModule: string): boolean {
    // Check if the module is active or not
    return nameModule === this.itemActive;
  }
}
