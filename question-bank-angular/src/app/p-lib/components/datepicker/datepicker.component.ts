import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'] // Corrected 'styleUrl' to 'styleUrls'
})
export class DatepickerComponent implements OnInit {
  public date = new Date();
  // value constructor
  public dateInMonth: number = 0;
  public currentDate: number = this.date.getDate();
  public currentMonth: number = this.date.getMonth();
  public currentYear: number = this.date.getFullYear();
  // check valid
  public indexDateStart: number = 0;
  public isOpenCalendar: boolean = false;
  public isCurrentDate: boolean = false;
  public isPickedDate: boolean = false;
  public isDisableDate: boolean = false;
  public isOpenListMonth: boolean = false;
  //value
  public fullPickedDate: string = '';
  // value after change
  public changedDate: number = this.currentDate;
  public changedMonth: number = this.currentMonth + 1;
  public changedYear: number = this.currentYear;
  // value of date is picked
  public pickedDate: number = 0;
  public pickedMonth: number = 0;
  public pickedYear: number = 0;
  // list
  public listDayInMonth: number[] = [];
  public listDayDisableStartInMonth: number[] = [];
  public listDayDisableEndInMonth: number[] = []
  public listMonths: string[] = [
    'Tháng một',
    'Tháng hai',
    'Tháng ba',
    'Tháng tư',
    'Tháng năm',
    'Tháng sáu',
    'Tháng bảy',
    'Tháng tám',
    'Tháng chín',
    'Tháng mười',
    'Tháng mười một',
    'Tháng mười hai'
  ];
  public listYears: number[] = [];


  constructor() { }

  ngOnInit() {
    this.valueChangeable();
    if(this.changedDate <= 0){
      this.fullPickedDate = '??/' + String(this.changedMonth) + '/' + String(this.changedYear);
    }
    console.log('Current date: ', this.formatDate(this.currentDate, this.currentMonth + 1, this.currentYear));
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent){
    if (!(event.target as HTMLElement).closest('.date-container_header_date-picked') && !(event.target as HTMLElement).closest('.date-container_header_date-picked_month') && !(event.target as HTMLElement).closest('.date-container_header_date-picked_year')) {
      // Nếu không phải, đóng toolBox
      this.isOpenListMonth = false;
    }
    if (!(event.target as HTMLElement).closest('.date-container') && !(event.target as HTMLElement).closest('.date-picker-open')) {
      // Nếu không phải, đóng toolBox
      this.isOpenCalendar = false;
    }
  }

  // open calendar
  setOpenCalendar(): void {
    this.isOpenCalendar = !this.isOpenCalendar;
  }

  // change format month from number to string
  changeMonthToString(month: number) {
    return this.listMonths[month - 1];
  }

  // Next, Back month
  changeMonth(direc: string): void {
    if (direc === 'incre') {
      if (this.changedMonth !== 12) {
        this.changedMonth += 1;
      }
      else {
        this.changedMonth = 1;
        this.changedYear += 1;
      }
    }
    else if (direc === 'decre') {
      if (this.changedMonth > 1) {
        this.changedMonth -= 1;
      }
      else {
        this.changedMonth = 12;
        this.changedYear -= 1;
      }
    }
    console.log('After month change: ', this.changedMonth + '/' + this.changedYear)
  }

  // check current date is valid
  checkCurrentDate(date: number) {
    if (date === this.currentDate && this.changedMonth === this.currentMonth + 1 && this.changedYear === this.currentYear) {
      return true;
    }
    return false;
  }

  // all value changeable 
  valueChangeable() {
    this.dateInMonth = new Date(this.changedYear, this.changedMonth + 1, 0).getDate();
    this.indexDateStart = new Date(this.changedYear, this.changedMonth - 1, 1).getDay() - 1; // Calculate index of the first day
    if (this.indexDateStart === -1) {
      this.indexDateStart = 6;
    }
    this.listDayInMonth = Array.from({ length: this.dateInMonth }, (_, index) => index + 1);
    this.listDayDisableStartInMonth = Array.from({ length: this.indexDateStart }, (_, index) => index + 1);
    this.fullPickedDate = this.formatDate(this.changedDate, this.changedMonth, this.changedYear);
  }

  // format date dd/MM/yyyy
  formatDate(date: number, month: number, year: number) {
    return String(date) + '/' + String(month) + '/' + String(year);
  }

  // pick one date
  pickDate(date: number, month: number, year: number): void { 
    if (this.pickedDate === date && this.pickedMonth === month && this.pickedYear === year) {
      this.pickedDate = 0;
      this.pickedMonth = 0;
      this.pickedYear = 0;
    }
    else{
      this.pickedDate = date;
      this.pickedMonth = month;
      this.pickedYear = year;
  
      this.changedDate = date;
      this.changedMonth = month;
      this.changedYear = year;
    }
    
    this.fullPickedDate = this.formatDate(this.pickedDate, this.pickedMonth, this.pickedYear);
    console.log('Date is picked: ', this.formatDate(this.pickedDate, this.pickedMonth, this.pickedYear));
  }

  // check date is picked or not
  checkPickedDate(date: number) {
    return this.formatDate(date, this.changedMonth, this.changedYear) === this.formatDate(this.pickedDate!, this.pickedMonth!, this.pickedYear!);
  }

  // check date is ealier than current date or not
  checkDisableDate(month: number, date: number, year: number) {
    const dateNeedToCheck = new Date(String(this.formatDate(month, date, year)));
    const currentDate = new Date(String(this.formatDate(this.currentMonth + 1, this.currentDate, this.currentYear)));
    return dateNeedToCheck < currentDate;
  }

}
