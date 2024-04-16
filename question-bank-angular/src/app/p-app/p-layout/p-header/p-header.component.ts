import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../../../p-lib/services/module.service';
import { ModuleDTO } from '../../../p-lib/dto/module.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-p-header',
  templateUrl: './p-header.component.html',
  styleUrls: ['./p-header.component.scss']
})
export class PHeaderComponent implements OnInit {
  public modules: ModuleDTO[] = [];
  public activeModules: { [key: string]: boolean } = {};
  public itemActive = '';

  constructor(private moduleService: ModuleService, private router: Router) { }

  ngOnInit(): void {
    this.getModulesFromServer();
  }

  getModulesFromServer() {
    this.moduleService.getModules().subscribe((response) => {
      this.modules = response; // Lưu dữ liệu nhận được từ server
    });
  }

  // Thực hiện khi click vào Module bất kỳ
  onModuleClick(nameModule: string): void {
    this.itemActive = nameModule;
    this.moduleService.moduleActive = nameModule;
  }

  // Kiểm tra xem Module có đang được active hay không
  isModuleActive(nameModule: string): boolean {
    const currentURL = this.router.url;
    return '/' + currentURL.split('/')[1] === nameModule;
  }
}
