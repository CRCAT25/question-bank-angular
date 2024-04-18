import { ActivatedRoute, Router } from '@angular/router';
import { ModuleService } from '../../../p-lib/services/module.service';
import { QuestionDTO } from './shared/question.dto';
import { Component, HostListener, OnInit } from '@angular/core';
import { StatusService } from '../../../p-lib/services/status.service';
import { StatusDTO } from '../../../p-lib/dto/status.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public isOpenPopupDelete: boolean = false;
  public isOpenDropUp: boolean = false;
  public listNotifi: string[] = [];
  public idDeleted: string = '';
  public nameDeleted: string = '';
  public listIdDeleted: string[] = [];
  public listGeneralTool: string[] = [];
  public listItemPerPage: number[] = [25, 50, 75, 100];
  public itemPerPage: number = 25;
  public selectedItemIndex: number = 0;
  public remainingList: number[] = [];
  public currentPage: number = 1;
  public totalPages: number = 1;
  public startIndex: number = 0; // Chỉ mục bắt đầu của dữ liệu trên trang hiện tại
  public endIndex: number = this.itemPerPage - 1; // Chỉ mục kết thúc của dữ liệu trên trang hiện tại
  public startPage: number = 1; // Chỉ mục kết thúc của dữ liệu trên trang hiện tại
  public listTotalPages: number[] = [];
  public checkedItems: string[] = []; // Mảng lưu trữ trạng thái checked của từng item
  public toolAvailable: { [key: string]: string[] }[] = [
    { 'Đang soạn thảo': ['Chỉnh sửa', 'Gửi duyệt', 'Xóa câu hỏi'] },
    { 'Gửi duyệt': ['Chỉnh sửa', 'Phê duyệt', 'Trả về'] },
    { 'Duyệt áp dụng': ['Xem chi tiết', 'Ngưng hiển thị'] },
    { 'Ngưng áp dụng': ['Xem chi tiết', 'Phê duyệt', 'Trả về'] },
    { 'Trả về': ['Chỉnh sửa', 'Gửi duyệt'] },
  ];

  questionForm = this.formBuilder.group({
    questionName: ['', Validators.required],
    questionId: ['', Validators.required],
  });
  
  constructor(
    private moduleService: ModuleService,
    private router: Router,
    private statusService: StatusService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.statusService.getStatus().subscribe(status => this.statuses = status);
    this.moduleService.getCategoryByModule(this.router.url).subscribe(item => {
      this.listQuestion = item.data;
      this.filterQuestions(); // Gọi hàm lọc sau khi nhận được danh sách câu hỏi
      this.calculateTotalPages();
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
        item.question.toLowerCase().includes(searchTextLower))// Tìm kiếm theo câu hỏi
    );

    this.currentListQuestion = this.currentListQuestion.slice(0, this.itemPerPage);
    this.calculateTotalPages();
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
    if (!(event.target as HTMLElement).closest('.footer-box') && !(event.target as HTMLElement).closest('.fa')) {
      // Nếu không phải, đóng toolBox
      this.closeDropUp();
    }
    if (!(event.target as HTMLElement).closest('.footer-box') && !(event.target as HTMLElement).closest('.fa')) {
      // Nếu không phải, đóng toolBox
      this.closeDropUp();
    }
  }

  // Sự kiện dùng để cập nhật trạng thái cho 1 câu hỏi
  updateStatus(id: string, newStatus: string, question: string): void {
    this.listNotifi = [];
    if (!(newStatus === 'Xem chi tiết' || newStatus === 'Chỉnh sửa')) {
      if (newStatus === 'Phê duyệt') {
        newStatus = 'Duyệt áp dụng';
      }
      if (newStatus === 'Ngưng hiển thị') {
        newStatus = 'Ngưng áp dụng'
      }
      // Gọi API để xóa câu hỏi nếu newStatus là 'Xóa câu hỏi'
      if (newStatus === 'Xóa câu hỏi') {
        this.openPopupDelete();
        this.idDeleted = id;
        this.nameDeleted = question;
      } else {
        // Gọi API để cập nhật trạng thái của câu hỏi
        this.moduleService.updateQuestionStatus(id, newStatus).subscribe(
          response => {
            this.showNotifi(id, [], newStatus);
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
    if (this.currentListQuestion.length !== 0) {
        // Kiểm tra xem đang ở chế độ checkAll hay không
        if (this.isCheckAll) {
            // Xóa các mục đã chọn khỏi danh sách nếu chúng đã tồn tại
            this.currentListQuestion?.forEach((item) => {
                const index = this.checkedItems.indexOf(item.id);
                if (index !== -1) {
                    this.checkedItems.splice(index, 1);
                }
            });
        } else {
            // Thêm các mục chưa chọn vào danh sách
            this.currentListQuestion?.forEach((item) => {
                if (!this.checkedItems.includes(item.id)) {
                    this.checkedItems.push(item.id);
                }
            });
        }
        this.isCheckAll = !this.isCheckAll;

        // Xóa danh sách công cụ hiện tại
        this.listGeneralTool = [];

        // Duyệt qua danh sách các item đã chọn và thêm các công cụ của chúng vào listGeneralTool
        this.checkedItems.forEach(itemId => {
            const searchTextLower = this.searchText.toLowerCase();
            const selectedItem = this.listQuestion.filter(item =>
                this.isChecked(item.status) &&
                (item.id.toLowerCase().includes(searchTextLower) || // Tìm kiếm theo mã câu hỏi
                    item.question.toLowerCase().includes(searchTextLower))).find(item => item.id === itemId);
            if (selectedItem) {
                const selectedStatus = selectedItem.status;
                const availableToolsForItem = this.toolBoxList(selectedStatus);
                availableToolsForItem.forEach(tool => {
                    // Kiểm tra xem công cụ đã tồn tại trong listGeneralTool và không phải là 'Xem chi tiết' hoặc 'Chỉnh sửa'
                    if (!this.listGeneralTool.includes(tool) && tool !== 'Xem chi tiết' && tool !== 'Chỉnh sửa') {
                        this.listGeneralTool.push(tool);
                    }
                });
            }
        });
    }
}


  // Kiểm tra item đó có trong list được check hay không
  isInListCheckAll(id: string): boolean {
    return this.checkedItems.includes(id);
  }

  // Kiểm tra tất cả các item hiện tại check hay không
  isAllCurrentItemChecked(): boolean {
    if (this.currentListQuestion.length === 0) {
      return false;
    }
    let allChecked = true; // Mặc định là true
    this.isCheckAll = true;

    this.currentListQuestion.forEach(item => {
      if (!this.checkedItems.includes(item.id)) {
        allChecked = false; // Nếu có ít nhất một item không được chọn, đặt allChecked thành false
        this.isCheckAll = false;
      }
    });

    return allChecked; // Trả về giá trị sau khi kiểm tra tất cả các item
  }

  // Sự kiện khi click vào check của 1 câu hỏi
  checkItem(id: string, status: string) {
    // Kiểm tra nếu id không tồn tại trong danh sách checkedItems, thêm vào danh sách
    if (!this.checkedItems.includes(id)) {
      this.checkedItems.push(id);
    } else {
      // Nếu id đã tồn tại, loại bỏ khỏi danh sách
      const index = this.checkedItems.indexOf(id);
      if (index !== -1) {
        this.checkedItems.splice(index, 1);
      }
    }

    // Xóa danh sách công cụ hiện tại
    this.listGeneralTool = [];

    // Duyệt qua danh sách các item đã chọn và thêm các công cụ của chúng vào listGeneralTool
    this.checkedItems.forEach(itemId => {
      const searchTextLower = this.searchText.toLowerCase();
      const selectedItem = this.listQuestion.filter(item =>
        this.isChecked(item.status) &&
        (item.id.toLowerCase().includes(searchTextLower) || // Tìm kiếm theo mã câu hỏi
          item.question.toLowerCase().includes(searchTextLower))).find(item => item.id === itemId);
      if (selectedItem) {
        const selectedStatus = selectedItem.status;
        const availableToolsForItem = this.toolBoxList(selectedStatus);
        availableToolsForItem.forEach(tool => {
          // Kiểm tra xem công cụ đã tồn tại trong listGeneralTool và không phải là 'Xem chi tiết' hoặc 'Chỉnh sửa'
          if (!this.listGeneralTool.includes(tool) && tool !== 'Xem chi tiết' && tool !== 'Chỉnh sửa') {
            this.listGeneralTool.push(tool);
          }
        });
      }
    });

    console.log(this.checkedItems)
    console.log(this.listGeneralTool)
  }

  // Sự kiện mở popup delete cofirm 
  openPopupDelete() {
    this.isOpenPopupDelete = true;
  }

  // Sự kiện đóng popup delete cofirm 
  closePopupDelete() {
    this.isOpenPopupDelete = false;
  }

  // Sự kiện xóa 1 câu hỏi
  deleteQuestion(id: string) {
    this.listNotifi = [];
    this.moduleService.deleteQuestion(id).subscribe(
      response => {
        // Xóa câu hỏi khỏi mảng listQuestion nếu xóa thành công
        // console.log(response.message); // Log kết quả trả về từ server (nếu cần)
        this.showNotifi(id, [], 'Xóa');
        const deletedQuestionIndex = this.listQuestion.findIndex(question => question.id === id);
        if (deletedQuestionIndex !== -1) {
          this.listQuestion[deletedQuestionIndex].status = 'Xóa';
          this.listQuestion.splice(deletedQuestionIndex, 1);
        }
        // Thực hiện các hành động khác sau khi xóa thành công (nếu cần)
      },
      error => {
        console.error(error); // Log lỗi nếu có
        // Xử lý lỗi hoặc thông báo cho người dùng (nếu cần)
      }
    );
    this.idDeleted = ''
    this.nameDeleted = ''
    this.closePopupDelete();
  }

  // Đóng popup khi có nhiều câu hỏi được chọn
  closePopupCheckMany() {
    this.checkedItems = [];
    this.isCheckAll = false;
    this.listGeneralTool = [];
  }

  // Hàm được gọi khi cần cập nhật nhiều câu hỏi
  updateManyQuestions(newStatus: string): void {
    this.listNotifi = [];
    if (newStatus !== 'Xóa câu hỏi') {
      let allowedStatuses: string[] = [];

      // Xác định các trạng thái được phép update dựa trên newStatus
      switch (newStatus) {
        case 'Gửi duyệt':
          allowedStatuses = ['Đang soạn thảo', 'Trả về'];
          break;
        case 'Phê duyệt':
          allowedStatuses = ['Gửi duyệt', 'Ngưng áp dụng'];
          break;
        case 'Ngưng hiển thị':
          allowedStatuses = ['Duyệt áp dụng'];
          break;
        case 'Trả về':
          allowedStatuses = ['Gửi duyệt', 'Ngưng áp dụng'];
          break;
        default:
          break;
      }

      if (newStatus === 'Phê duyệt') {
        newStatus = 'Duyệt áp dụng';
      }
      if (newStatus === 'Ngưng hiển thị') {
        newStatus = 'Ngưng áp dụng'
      }

      // Lọc danh sách các câu hỏi thỏa mãn điều kiện
      const filteredQuestionIds: string[] = this.checkedItems.filter(itemId => {
        const selectedQuestion = this.listQuestion.find(question => question.id === itemId);
        return selectedQuestion && allowedStatuses.includes(selectedQuestion.status);
      });

      // Kiểm tra xem danh sách câu hỏi đã lọc có rỗng không
      if (filteredQuestionIds.length === 0) {
        console.log('Không có câu hỏi thỏa mãn điều kiện.');
        return;
      }

      // Thực hiện gọi API để cập nhật trạng thái cho danh sách các câu hỏi đã lọc
      this.moduleService.updateManyQuestionStatus(filteredQuestionIds, newStatus)
        .subscribe(
          response => {
            this.showNotifi('', filteredQuestionIds, newStatus);
            // Xử lý phản hồi từ server (nếu cần)
            filteredQuestionIds.forEach(itemId => {
              // Lấy câu hỏi được chọn từ listQuestion
              const selectedQuestion = this.listQuestion.find(question => question.id === itemId);
              if (selectedQuestion) {
                // Cập nhật trạng thái mới cho các câu hỏi trong listQuestion
                selectedQuestion.status = newStatus;
              }
            });

            this.closePopupCheckMany();
          },
          error => {
            // Xử lý lỗi (nếu có)
            console.error(error);
          }
        );
    }
    else {
      let allowedStatuses: string[] = ['Đang soạn thảo'];
      // Lọc danh sách các câu hỏi thỏa mãn điều kiện
      this.listIdDeleted = this.checkedItems.filter(itemId => {
        const selectedQuestion = this.listQuestion.find(question => question.id === itemId);
        return selectedQuestion && allowedStatuses.includes(selectedQuestion.status);
      });

      this.openPopupDelete();
      // console.log(this.listIdDeleted)
      // this.deleteManyQuestion();
    }
  }

  // Sự kiện xóa nhiều câu hỏi
  deleteManyQuestion() {
    this.listNotifi = [];
    // Thực hiện gọi API để cập nhật trạng thái cho danh sách các câu hỏi đã lọc
    const list = this.listIdDeleted;
    this.moduleService.deleteManyQuestions(this.listIdDeleted)
      .subscribe(
        response => {
          // Xử lý phản hồi từ server (nếu cần)
          this.showNotifi('', list, 'Xóa');
          list.forEach(item => {
            const deletedQuestionIndex = this.listQuestion.findIndex(question => question.id === item);
            if (deletedQuestionIndex !== -1) {
              this.listQuestion[deletedQuestionIndex].status = 'Xóa câu hỏi';
              this.listQuestion.splice(deletedQuestionIndex, 1);
            }
          })
        },
        error => {
          // Xử lý lỗi (nếu có)
          console.error(error);
        }
      );
    this.closePopupCheckMany();
    this.listIdDeleted = [];
    this.closePopupDelete();
  }

  // Sự kiện hiển thị thông báo khi update status
  showNotifi(item: string, list: string[], status: string) {
    if (item !== '') {
      this.listNotifi.push(item);
    }
    if (list.length !== 0) {
      this.listNotifi = list;
    }
    this.listNotifi.push(status);
  }

  // Sự kiện mở dropup
  openDropUp() {
    this.isOpenDropUp = !this.isOpenDropUp;
    if (this.isOpenDropUp) {
      this.remainingList = this.listItemPerPage.filter((item, index) => index !== this.selectedItemIndex);
      this.remainingList.sort((a, b) => b - a); // Sắp xếp tăng dần
    } else {
      this.remainingList = [];
    }
  }

  // Sự kiện đóng dropup
  closeDropUp() {
    this.isOpenDropUp = false;
  }

  // Sự kiện hiển thị số item trên 1 trang
  changeItemsPerPage(itemPerPage: number) {
    this.itemPerPage = itemPerPage;
    this.selectedItemIndex = this.listItemPerPage.indexOf(itemPerPage);
    this.isOpenDropUp = false;
    // Cập nhật lại danh sách câu hỏi hiển thị theo itemPerPage
    const searchTextLower = this.searchText.toLowerCase();
    this.currentListQuestion = this.listQuestion.filter(item =>
      this.isChecked(item.status) &&
      (item.id.toLowerCase().includes(searchTextLower) || // Tìm kiếm theo mã câu hỏi
        item.question.toLowerCase().includes(searchTextLower))// Tìm kiếm theo câu hỏi
    );
    this.currentListQuestion = this.currentListQuestion.slice(0, this.itemPerPage);
    this.calculateTotalPages();
  }

  // Sự kiện tính toán về pagination
  calculateTotalPages(): void {
    const searchTextLower = this.searchText.toLowerCase();
    this.totalPages = Math.ceil(this.listQuestion.filter(item =>
      this.isChecked(item.status) &&
      (item.id.toLowerCase().includes(searchTextLower) || // Tìm kiếm theo mã câu hỏi
        item.question.toLowerCase().includes(searchTextLower))// Tìm kiếm theo câu hỏi
    ).length / this.itemPerPage)

    this.listTotalPages = Array.from({ length: this.totalPages }, (_, index) => index + 1);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    this.startIndex = (this.currentPage - 1) * this.itemPerPage;
    this.endIndex = (this.currentPage * this.itemPerPage);

    this.currentListQuestion = this.listQuestion.filter(item =>
      this.isChecked(item.status) &&
      (item.id.toLowerCase().includes(searchTextLower) || // Tìm kiếm theo mã câu hỏi
        item.question.toLowerCase().includes(searchTextLower))).slice(this.startIndex, this.endIndex);
  }

  // Sự kiện tiến trang
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      if(this.currentPage === this.startPage + 4){
        this.startPage += 4;
      }
    }
    this.calculateTotalPages();
  }

  // Sự kiện lùi trang
  backPage(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      if(this.currentPage === this.startPage - 1){
        this.startPage -= 4;
      }
    }

    console.log(this.currentPage)
    console.log(this.startPage)
    this.calculateTotalPages();
  }

  // Sự kiện tiến đến trang đầu tiên
  firstPage(): void {
    this.currentPage = 1;
    this.startPage = 1;
    this.calculateTotalPages();
  }

  // Sự kiện tiến đến trang cuối cùng
  lastPage(): void {
    this.currentPage = this.totalPages;
    if(this.totalPages > 4){
      this.startPage = Math.floor(this.totalPages / 4) * 4 + 1;
    }
    this.calculateTotalPages();
  }

  // Hàm dấu 3 chấm next
  dotsNext(): void {
    if(this.totalPages > 4){
      if (this.startPage + 4 > this.totalPages) {
        this.startPage = Math.floor(this.totalPages / 4) * 4 + 1;
      }
      else {
        this.startPage += 4;
      }
      this.currentPage = this.startPage;
  
      // Tính toán lại danh sách câu hỏi cho trang hiện tại
      this.calculateTotalPages();
    }
  }

  // Hàm dấu 3 chấm back
  dotsBack(): void {
    if(this.currentPage > 4){
      if (this.startPage - 4 < 0) {
        this.startPage = 1;
        this.currentPage = this.startPage;
      }
      else {
        this.startPage -= 4;
        this.currentPage = this.startPage + 3;
      }
  
      // Tính toán lại danh sách câu hỏi cho trang hiện tại
      this.calculateTotalPages();
    }
  }

  // Hàm set trang hiện tại
  setCurrentPage(page: number) {
    this.currentPage = page;
    this.calculateTotalPages();
  }
  
  onSubmit(){

  }
}
