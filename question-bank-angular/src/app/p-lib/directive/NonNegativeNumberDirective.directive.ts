import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appNonNegativeNumber]'
})
export class NonNegativeNumberDirective {

    constructor(private el: ElementRef) { }

    @HostListener('input', ['$event']) onInputChange(event: Event) {
        const input = this.el.nativeElement as HTMLInputElement;
        let value = input.value.trim();

        // Kiểm tra xem giá trị nhập vào có phải là số không
        if (!value || isNaN(value as any)) {
            input.value = '';
            return;
        }

        // Chuyển đổi giá trị thành số
        const numericValue = parseFloat(value);

        // Kiểm tra xem giá trị có phải là số âm không
        if (numericValue < 0 || value.includes('.')) {
            input.value = '1'; // Đặt lại giá trị là 1 nếu là số âm hoặc có dấu thập phân
        }
    }
}
