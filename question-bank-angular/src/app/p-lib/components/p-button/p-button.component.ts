import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-p-button',
  templateUrl: './p-button.component.html',
  styleUrl: './p-button.component.scss'
})
export class PButtonComponent {
  @Input() classIcon: any | undefined;
  @Input() height: string | undefined;
  @Input() width: string | undefined;
  @Input() textSize: string = '14px';
  @Input() textColor: string = '#fff';
  @Input() bgColor: string = '#1A6634';
  @Input() text: string | undefined;
  @Input() iconSize: string = '16px';
  @Input() iconColor: string = '#fff';
}
