import { ActivatedRoute, Router } from '@angular/router';
import { ModuleService } from '../../../p-lib/services/module.service';
import { QuestionDTO } from './shared/question.dto';
import { Component, OnInit } from '@angular/core';
import { StatusService } from '../../../p-lib/services/status.service';
import { StatusDTO } from '../../../p-lib/dto/status.dto';

@Component({
  selector: 'app-p-questionbank',
  templateUrl: './p-questionbank.component.html',
  styleUrl: './p-questionbank.component.scss'
})
export class PQuestionbankComponent implements OnInit {
  public statuses: StatusDTO[] = [];
  listCheckedStatus: string[] = ['Đang soạn thảo'];
  public listQuestion: QuestionDTO[] = [];

  constructor(private moduleService: ModuleService, private router: Router, private statusService: StatusService) { }

  ngOnInit(): void {
    this.statusService.getStatus().subscribe(status => this.statuses = status);
    this.moduleService.getCategoryByModule(this.router.url).subscribe(item => {
      this.listQuestion = item.data;
    })
  }

  isChecked(status: string): boolean {
    if (this.listCheckedStatus.length === 0) {
      return true; // Trả về true để hiển thị tất cả câu hỏi
    }
    if(status === 'Áp dụng'){
      status = 'Duyệt áp dụng';
    }
    if(status === 'Ngừng áp dụng'){
      status = 'Ngưng áp dụng';
    }
    if(status === 'Trả về'){
      status = 'Đang soạn thảo';
    }
    return this.listCheckedStatus.includes(status);
  }
  
  toggleCheckbox(status: string): void {
    if(status === 'Áp dụng'){
      status = 'Duyệt áp dụng';
    }
    if(status === 'Ngừng áp dụng'){
      status = 'Ngưng áp dụng';
    }
    const index = this.listCheckedStatus.indexOf(status);
    if (index !== -1) {
      this.listCheckedStatus.splice(index, 1); // Loại bỏ nếu đã tồn tại
    } else {
      this.listCheckedStatus.push(status); // Thêm mới nếu chưa tồn tại
    }
    console.log(this.listCheckedStatus)
  }

  isInListStatus(status: string){
    if(status === 'Áp dụng'){
      status = 'Duyệt áp dụng';
    }
    if(status === 'Ngừng áp dụng'){
      status = 'Ngưng áp dụng';
    }
    if(status === 'Trả về'){
      status = 'Đang soạn thảo';
    }
    return this.listCheckedStatus.includes(status);
  }
}
