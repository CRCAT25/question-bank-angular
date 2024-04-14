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
  selectedModuleCategory: string = '';
  selectedSubModuleCategory: string = '';

  constructor(private moduleService: ModuleService) { }

  ngOnInit(): void {
    this.moduleService.selectedModuleName$.subscribe(name => {
      this.selectedModuleName = name;
      this.moduleService.getModuleCategoryByModule(name).subscribe(name => this.moduleCategory = name);
    });
  }

  // Thực hiện khi click vào ModuleCategory bất kỳ
  setSelectedModuleCategory(category: string): void {
    this.selectedModuleCategory = category;
  }

  // Kiểm tra xem ModuleCategory đó có đang được active hay không
  isModuleCategoryActive(category: string) {
    return this.selectedModuleCategory === category;
  }

  // Thực hiện khi click vào SubModuleCategory bất kỳ
  setSelectedSubModuleCategory(sub: string): void {
    this.selectedSubModuleCategory = sub;
    this.moduleService.setSelectedSubModuleCategory(sub);
  }

  // Kiểm tra xem SubModuleCategory đó có đang được active hay không
  isSubModuleCategoryActive(sub: string) {
    return this.selectedSubModuleCategory === sub;
  }
}
