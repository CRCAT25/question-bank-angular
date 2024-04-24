import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'] // Corrected 'styleUrl' to 'styleUrls'
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {
  public date = new Date();
  // value constructor
  public dateInMonth: number = 0;
  public currentDate: number = this.date.getDate();
  public currentMonth: number = this.date.getMonth();
  public currentYear: number = this.date.getFullYear();
  // check valid
  public indexDateStart: number = 0;
  public isOpenDatePicker: boolean = false;
  public isCurrentDate: boolean = false;
  public isPickedDate: boolean = false;
  public isDisableDate: boolean = false;
  //value
  public fullPickedDate: any = '';
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

  constructor() { }
  
  registerOnChange(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  OnChange: any = (value: any): void => {
    this.writeValue(value);
  }

  onBlur(value: any) {
    this.OnChange(value);
  }   

  writeValue(obj: string): void {
    const date = Number(obj.split('-')[2]);
    const month = Number(obj.split('-')[1]);
    const year = Number(obj.split('-')[0]);
    if(obj < this.formatDate(this.currentDate, this.currentMonth, this.currentYear)){
      this.changedDate = this.currentDate;
      this.changedMonth = this.currentMonth + 1;
      this.changedYear = this.currentYear;
      this.pickedDate = this.currentDate;
      this.pickedMonth = this.currentMonth + 1;
      this.pickedYear = this.currentYear;
      console.log('Value is invalid');
      this.fullPickedDate = this.formatDate(this.currentDate, this.currentMonth, this.currentYear);
    }
    else{
      if(obj !== this.formatDate(this.changedDate, this.changedMonth, this.changedYear)){
        let newYear = year;
        if(year > 3000){
          newYear = 3000;
        }
        this.changedDate = date;
        this.changedMonth = month;
        this.changedYear = newYear;
        this.pickedDate = date;
        this.pickedMonth = month;
        this.pickedYear = newYear;
        this.fullPickedDate = this.formatDate(this.changedDate, this.changedMonth - 1, newYear);
        console.log('Value is changed!');
        this.valueChangeable();
      }
    }
  }

  ngOnInit() {
    this.fullPickedDate = new Date().toLocaleDateString('en-CA');
    this.valueChangeable();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.date-container') && !(event.target as HTMLElement).closest('.date-picker-open')) {
      // Nếu không phải, đóng toolBox
      if(this.isOpenDatePicker === true){
        console.log('Datepicker is closed');
      }
      this.isOpenDatePicker = false;
    }
  }

  // open calendar
  setOpenDatePicker(): void {
    this.isOpenDatePicker = true;
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
    this.valueChangeable();
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
  }

  // format date dd/MM/yyyy
  formatDate(date: number, month: number, year: number) {
    return new Date(year, month, date).toLocaleDateString('en-CA');
  }

  // pick one date
  pickDate(date: number, month: number, year: number): void {
    this.OnChange(new Date(year, month - 1, date).toLocaleDateString('en-CA'));
  }

  // check date is picked or not
  checkPickedDate(date: number, month: number, year: number) {
    return this.pickedDate === date && this.pickedMonth === month && this.pickedYear === year;
  }

  // check date is ealier than current date or not
  checkDisableDate(date: number, month: number, year: number) {
    const dateNeedToCheck = this.formatDate(date, month, year);
    const currentDate = this.formatDate(this.currentDate, this.currentMonth + 1, this.currentYear);
    return dateNeedToCheck < currentDate;
  }
}
