import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent{
  @Input() type: string = '';
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmClicked: EventEmitter<any> = new EventEmitter();
  
  handleCancelButton(): void{
    this.type = '';
    this.close.emit();
  }

  handleConfirmButton(): void{
    this.confirmClicked.emit();
  }

  checkClass(block: string, type: string){
    return 'c-dialog-' + block + '_' + type; 
  }
}
