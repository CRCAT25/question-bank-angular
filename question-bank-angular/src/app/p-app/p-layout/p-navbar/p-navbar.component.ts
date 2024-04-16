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
  public selectedModuleCategory: string = '';
  public selectedSubModuleCategory: string = '';
  public currentURL: string ='';

  constructor(private moduleService: ModuleService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategoryModuleFromServer();
  }

  getCategoryModuleFromServer(){
    this.moduleService.getCurrentUrl().subscribe(url => {
      if(url === '' || url === '/'){
        this.router.navigate(['nhan-su' + '/' + 'ngan-hang-cau-hoi'], {relativeTo: this.route})
      }
      else{
        this.moduleService.getCategoryByModule('/' + url.split('/')[1]).subscribe((response) => {
          this.moduleCategory = response.moduleCategory; // Lưu dữ liệu nhận được từ server
        });
      }
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

  formatLink(link: string){
    return link.split('/')[1];
  }

  // Thực hiện khi click vào SubModuleCategory bất kỳ
  setSelectedSubModuleCategory(sub: string, link: string): void {
    this.selectedSubModuleCategory = sub;
    this.router.navigate(['nhan-su' + '/' + link], {relativeTo: this.route})
  }

  // Kiểm tra xem SubModuleCategory đó có đang được active hay không
  isSubModuleCategoryActive(sub: string) {
    return this.selectedSubModuleCategory === sub;
  }
}
