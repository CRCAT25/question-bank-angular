import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

/**
 * This directive is used for styling the element containing it by DOM manipulation
 */
@Directive({
  selector: '[multiselecttreedirective]',
})
export class MultiSelectTreeDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement as HTMLElement;
    if (element) {
      const spanInputInnerElement = element.querySelector('span.k-input-inner');
      if (spanInputInnerElement) {
        // Check if the new span already exists to prevent duplication
        if (!spanInputInnerElement.querySelector('span.new-button-dropdown')) {
          const newSpan = this.renderer.createElement('span');
          this.renderer.addClass(newSpan, 'new-button-dropdown');
          this.renderer.addClass(newSpan, 'k-i-chevron-down');
          this.renderer.addClass(newSpan, 'k-font-icon');
          this.renderer.appendChild(spanInputInnerElement, newSpan); 
        }
      }
    }
  }
}
