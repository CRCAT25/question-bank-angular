import { ActivatedRoute, Router } from '@angular/router';
import { ModuleService } from '../../../p-lib/services/module.service';
import { QuestionDTO } from './shared/question.dto';
import { Component, HostListener, OnInit } from '@angular/core';
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
  public toolBoxId: string = '';
  public isCheckAll: boolean = false;
  public checkedItems: string[] = []; // Mảng lưu trữ trạng thái checked của từng item
  public toolAvailable: { [key: string]: string[] }[] = [
    { 'Đang soạn thảo': ['Chỉnh sửa', 'Gửi duyệt', 'Xóa câu hỏi'] },
    { 'Gửi duyệt': ['Chỉnh sửa', 'Phê duyệt', 'Trả về'] },
    { 'Duyệt áp dụng': ['Xem chi tiết', 'Ngưng hiển thị'] },
    { 'Ngưng áp dụng': ['Xem chi tiết', 'Phê duyệt', 'Trả về'] },
    { 'Trả về': ['Chỉnh sửa', 'Gửi duyệt'] },
  ];



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

  // Lọc các status có thể tương tác của 1 status
  toolBoxList(status: string) {
    let listTool: string[] = [];
    this.toolAvailable.forEach(tool => {
      if (tool[status]) {
        listTool = tool[status];
        // console.log(tool[status])
      }
    });

    return listTool;
  }

  // Mở toolBox
  openToolBox(id: string) {
    if (this.toolBoxId !== id) {
      this.toolBoxId = id;
    }
    else {
      this.toolBoxId = '';
    }
  }

  // Sự kiện search ngay khi nhấn enter
  onSearchKeyDown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.searchButtonClick(); // Gọi hàm searchButtonClick khi nhấn phím Enter
    }
  }

  // Sự kiện đóng toolBox
  closeToolBox(): void {
    this.toolBoxId = '';
  }

  // Sự kiện khi click ra ngoài màn hình
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    // Kiểm tra xem phần tử được click có phải là other-pro_status_tool hay không
    if (!(event.target as HTMLElement).closest('.other-pro_status_tool')) {
      // Nếu không phải, đóng toolBox
      this.closeToolBox();
    }
  }

  // Sự kiện dùng để cập nhật trạng thái cho 1 câu hỏi
  updateStatus(id: string, newStatus: string): void {
    if (!(newStatus === 'Xem chi tiết' || newStatus === 'Chỉnh sửa')) {
      if (newStatus === 'Phê duyệt') {
        newStatus = 'Duyệt áp dụng';
      }
      if (newStatus === 'Ngưng hiển thị') {
        newStatus = 'Ngưng áp dụng'
      }
      // Gọi API để xóa câu hỏi nếu newStatus là 'Xóa câu hỏi'
      if (newStatus === 'Xóa câu hỏi') {
        this.moduleService.deleteQuestion(id).subscribe(
          response => {
            // Xóa câu hỏi khỏi mảng listQuestion nếu xóa thành công
            // console.log(response.message); // Log kết quả trả về từ server (nếu cần)
            const deletedQuestionIndex = this.listQuestion.findIndex(question => question.id === id);
            if (deletedQuestionIndex !== -1) {
              this.listQuestion[deletedQuestionIndex].status = newStatus;
              this.listQuestion.splice(deletedQuestionIndex, 1);
            }
            // Thực hiện các hành động khác sau khi xóa thành công (nếu cần)
          },
          error => {
            console.error(error); // Log lỗi nếu có
            // Xử lý lỗi hoặc thông báo cho người dùng (nếu cần)
          }
        );
      } else {
        // Gọi API để cập nhật trạng thái của câu hỏi
        this.moduleService.updateQuestionStatus(id, newStatus).subscribe(
          response => {
            // console.log(response.message); // Log kết quả trả về từ server (nếu cần)
            // Cập nhật trạng thái mới cho câu hỏi trong mảng listQuestion
            const updatedQuestionIndex = this.listQuestion.findIndex(question => question.id === id);
            if (updatedQuestionIndex !== -1) {
              this.listQuestion[updatedQuestionIndex].status = newStatus;
            }
            // Thực hiện các hành động khác sau khi cập nhật thành công (nếu cần)
          },
          error => {
            console.error(error); // Log lỗi nếu có
            // Xử lý lỗi hoặc thông báo cho người dùng (nếu cần)
          }
        );
      }
    }
    this.closeToolBox();
  }

  // Sự kiện khi click vào checkbox checkAll
  onClickCheckAll() {
    this.isCheckAll = !this.isCheckAll;
    // this.checkedItems = this.currentListQuestion?.map(() => checked) || [];
    if (this.isCheckAll) {
      this.currentListQuestion?.forEach((item) => {
        this.checkedItems.push(item.id); // Log những item được check
      });
    }
    else {
      this.checkedItems = [];
    }
    console.log(this.currentListQuestion.map(item => item.id))
    console.log(this.checkedItems)
  }

  // Kiểm tra item đó có trong list được check hay không
  isInListCheckAll(id: string): boolean {
    return this.checkedItems.includes(id);
  }

  // Kiểm tra tất cả các item hiện tại check hay không
  isAllCurrentItemChecked(): boolean {
    let allChecked = true; // Mặc định là true

    this.currentListQuestion.forEach(item => {
      if (!this.checkedItems.includes(item.id)) {
        allChecked = false; // Nếu có ít nhất một item không được chọn, đặt allChecked thành false
      }
    });

    return allChecked; // Trả về giá trị sau khi kiểm tra tất cả các item
  }

  checkItem(id: string) {
    if (!this.checkedItems.includes(id)) {
      this.checkedItems.push(id)
    }
    else {
      const index = this.checkedItems.indexOf(id);
      if (index !== -1) {
        this.checkedItems.splice(index, 1); // Loại bỏ nếu đã tồn tại
      }
    }
  }
}
