import { AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core';

/**
 * This directive that is used for style tag contain it by DOM
 */
@Directive({
    selector: '[dropdowntreelistdirective]',
})


export class DropDownTreeListDirective implements AfterViewInit {
    constructor(private elementRef: ElementRef) { }
    ngAfterViewInit(): void {
        let element = this.elementRef.nativeElement as HTMLElement;
        if (element) {
            const buttonClear = element.querySelector('span.k-clear-value') as HTMLElement;
            if(buttonClear){
                buttonClear.style.display = "none";
            }
            const svgIconElement = element.querySelector('kendo-svgicon.k-svg-i-caret-alt-down');
            if (svgIconElement) {
                svgIconElement.querySelector('svg path')?.setAttribute("d", "m382.059 158.059-126.06 126.06-126.061-126.06L96 192l159.999 160L416 192z"); 
            }
        }
    }
}