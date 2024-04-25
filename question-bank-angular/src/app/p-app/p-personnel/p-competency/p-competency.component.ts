import { Component } from '@angular/core';

@Component({
  selector: 'app-p-competency',
  templateUrl: './p-competency.component.html',
  styleUrl: './p-competency.component.scss'
})
export class PCompetencyComponent {
  public typeDialog: string = '';
  public dialog: string = '';

  openDialog(dialog: string,type: string): void {
    this.typeDialog = type;
    this.dialog = dialog;
  }

  closeDialog(): void {
    this.typeDialog = '';
    this.dialog = '';
  }

  handleError(): void {
    console.log('Error is handled');
    this.closeDialog();
  }

  handleInformation(): void {
    console.log('Information is handled');
    this.closeDialog();
  }

  handleSuccess(): void {
    console.log('Success is handled');
    this.closeDialog();
  }
}
