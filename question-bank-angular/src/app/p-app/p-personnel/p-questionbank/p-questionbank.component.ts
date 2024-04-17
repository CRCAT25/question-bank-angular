import { ActivatedRoute, Router } from '@angular/router';
import { ModuleService } from '../../../p-lib/services/module.service';
import { QuestionDTO } from './shared/question.dto';
import { Component, OnInit } from '@angular/core';
import { StatusService } from '../../../p-lib/services/status.service';
import { StatusDTO } from '../../../p-lib/dto/status.dto';

@Component({
  selector: 'app-p-questionbank',
  templateUrl: './p-questionbank.component.html',
  styleUrls: ['./p-questionbank.component.scss']
})
export class PQuestionbankComponent implements OnInit {
  public statuses: StatusDTO[] = [];
  public listCheckedStatus: string[] = ['Đang soạn thảo'];
  public listQuestion: QuestionDTO[] = [];
  public currentListQuestion: QuestionDTO[] = [];
  public searchText: string = '';

  constructor(
    private moduleService: ModuleService,
    private router: Router,
    private statusService: StatusService
  ) { }

  ngOnInit(): void {
    this.statusService.getStatus().subscribe(status => this.statuses = status);
    this.moduleService.getCategoryByModule(this.router.url).subscribe(item => {
      this.listQuestion = item.data;
      this.filterQuestions(); // Gọi hàm lọc sau khi nhận được danh sách câu hỏi
    });
  }

  // Kiểm tra status có được check hay không
  isChecked(status: string): boolean {
    if (this.listCheckedStatus.length === 0) {
      return true; // Trả về true để hiển thị tất cả câu hỏi nếu listCheckedStatus rỗng
    }
    // Đảm bảo rằng các status được thay thế đúng trước khi kiểm tra
    status = this.replaceStatus(status);
    return this.listCheckedStatus.includes(status);
  }

  // Sự kiện khi click vào status filter
  toggleCheckbox(status: string): void {
    status = this.replaceStatus(status);
    const index = this.listCheckedStatus.indexOf(status);
    if (index !== -1) {
      this.listCheckedStatus.splice(index, 1); // Loại bỏ nếu đã tồn tại
    } else {
      this.listCheckedStatus.push(status); // Thêm mới nếu chưa tồn tại
    }
    this.filterQuestions(); // Sau khi thay đổi trạng thái, lọc lại danh sách câu hỏi
  }

  // Kiểm tra status có được check hay không
  isInListStatus(status: string): boolean {
    // Đảm bảo rằng các status được thay thế đúng trước khi kiểm tra
    status = this.replaceStatus(status);
    return this.listCheckedStatus.includes(status);
  }

  // Format lại status
  replaceStatus(status: string): string {
    switch (status) {
      case 'Áp dụng':
        return 'Duyệt áp dụng';
      case 'Ngừng áp dụng':
        return 'Ngưng áp dụng';
      case 'Trả về':
        return 'Đang soạn thảo';
      default:
        return status;
    }
  }

  // Lọc listQuestions
  filterQuestions(): void {
    // Chuyển đổi giá trị của biến searchText thành chữ thường để so sánh không phân biệt hoa thường
    const searchTextLower = this.searchText.toLowerCase();

    // Lọc danh sách câu hỏi dựa trên các status trong listCheckedStatus và từ khóa tìm kiếm
    this.currentListQuestion = this.listQuestion.filter(item =>
      this.isChecked(item.status) &&
      (item.id.toLowerCase().includes(searchTextLower) || // Tìm kiếm theo mã câu hỏi
        item.question.toLowerCase().includes(searchTextLower)) // Tìm kiếm theo câu hỏi
    );
  }

  // Sự kiện được gọi khi search câu hỏi
  searchButtonClick(): void {
    // Lấy giá trị từ input và gán cho textSearch
    this.searchText = (document.querySelector('.filters_container_search_input input') as HTMLInputElement).value;
    console.log(this.currentListQuestion)
    console.log(this.searchText)
    // Gọi hàm filterQuestions để lọc dữ liệu và hiển thị kết quả
    this.filterQuestions();
  }

  // Sự kiện được gọi khi reset bộ lọc
  resetFilters(): void {
    // Đặt lại giá trị của biến textSearch về rỗng
    this.searchText = '';
    (document.querySelector('.filters_container_search_input input') as HTMLInputElement).value = '';

    // Đặt lại giá trị mặc định cho listCheckedStatus
    this.listCheckedStatus = ['Đang soạn thảo'];

    // Gọi hàm filterQuestions để áp dụng bộ lọc lại
    this.filterQuestions();
  }

}
