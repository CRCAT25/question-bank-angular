import { Directive, ElementRef, OnInit } from '@angular/core';

/**
 * This directive that is used for style tag contain it by DOM
 */
@Directive({
    selector: '[dropdownlistdirective]',
})


export class DropDownListDirective implements OnInit {
    constructor(private elementRef: ElementRef) { }
    ngOnInit(): void {
        let element = this.elementRef.nativeElement as HTMLElement;
        if (element) {
            const svgIconElement = element.querySelector('kendo-svgicon');
            if (svgIconElement) {
                svgIconElement.querySelector('svg path')?.setAttribute("d", "m382.059 158.059-126.06 126.06-126.061-126.06L96 192l159.999 160L416 192z");      
            }
        }
    }
}