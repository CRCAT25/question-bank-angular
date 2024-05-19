import { Component } from '@angular/core';
import { CompanyService } from '../share/services/company.service';

@Component({
  selector: 'app-p-decentralization',
  templateUrl: './p-decentralization.component.html',
  styleUrl: './p-decentralization.component.scss'
})
export class PDecentralizationComponent {
  constructor(private companies: CompanyService){}
}
