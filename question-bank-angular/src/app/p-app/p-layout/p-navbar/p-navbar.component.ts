import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../../../p-lib/services/module.service';
import { ModuleCategoryDTO } from '../../../p-lib/dto/moduleCategory.dto';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';

@Component({
  selector: 'app-p-navbar',
  templateUrl: './p-navbar.component.html',
  styleUrl: './p-navbar.component.scss'
})
export class PNavbarComponent implements OnInit {
  public moduleCategory: ModuleCategoryDTO[] = [];
  public selectedModuleCategories: string[] = [];
  public selectedSubModuleCategory: string = '';

  constructor(private moduleService: ModuleService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategoryModuleFromServer();
    // set default khi khởi động component
    this.setSelectedModuleCategory('Đánh giá nhân sự');
    this.setSelectedSubModuleCategory('Khung năng lực', '/nhan-su/khung-nang-luc');
  }

  // Lấy ModuleCategory và SubModuleCategory từ server thông qua service
  getCategoryModuleFromServer() {
    this.moduleService.getCurrentUrl().subscribe(url => {
      if (url === '' || url === '/') {
        this.router.navigate(['nhan-su' + '/' + 'khung-nang-luc'], { relativeTo: this.route })
      }
      else {
        this.moduleService.getCategoryByModule('/' + url.split('/')[1]).subscribe((response) => {
          this.moduleCategory = response.moduleCategory; // Lưu dữ liệu nhận được từ server
        });
      }
    });
  }

  // Thực hiện khi click vào ModuleCategory bất kỳ
  setSelectedModuleCategory(category: string): void {
    const index = this.selectedModuleCategories.indexOf(category);
    if (index === -1) {
      this.selectedModuleCategories.push(category);
    } else {
      this.selectedModuleCategories.splice(index, 1);
    }
  }

  // Kiểm tra xem ModuleCategory đó có đang được active hay không
  isModuleCategoryActive(category: string) {
    return this.selectedModuleCategories.includes(category);
  }

  formatLink(link: string) {
    return link.split('/')[1];
  }

  // Thực hiện khi click vào SubModuleCategory bất kỳ
  setSelectedSubModuleCategory(sub: string, link: string): void {
    this.selectedSubModuleCategory = sub;
    this.router.navigate([this.router.url.split('/')[1] + '/' + link], { relativeTo: this.route })
  }

  // Kiểm tra xem SubModuleCategory đó có đang được active hay không
  isSubModuleCategoryActive(sub: string) {
    return this.selectedSubModuleCategory === sub;
  }
}
