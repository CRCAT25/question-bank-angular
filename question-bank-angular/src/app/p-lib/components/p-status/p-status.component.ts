import { Component, OnInit } from '@angular/core';
import { StatusDTO } from '../../dto/status.dto';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-p-status',
  templateUrl: './p-status.component.html',
  styleUrl: './p-status.component.scss'
})
export class PStatusComponent implements OnInit {
  public statuses: StatusDTO[] = [];
  isCheckedStatus: { [key: number]: boolean } = {};

  constructor(private statusService: StatusService) { }

  ngOnInit(): void {
    this.statusService.getStatus().subscribe(status => this.statuses = status);
  }


  isChecked(id: number): boolean {
    return this.isCheckedStatus[id] || false;
  }
  
  toggleCheckbox(id: number): void {
    this.isCheckedStatus[id] = !this.isChecked(id);
    console.log(this.isCheckedStatus);
  }
}
