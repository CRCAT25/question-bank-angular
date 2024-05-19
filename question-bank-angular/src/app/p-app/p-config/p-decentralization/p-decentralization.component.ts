import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../shared/services/company.service';
import { DTOCompany } from '../shared/dtos/company.dto';
import { SubSystemService } from '../shared/services/subsystem.service';
import { DTOGroup } from '../shared/dtos/group.dto';

@Component({
  selector: 'app-p-decentralization',
  templateUrl: './p-decentralization.component.html',
  styleUrl: './p-decentralization.component.scss'
})
export class PDecentralizationComponent implements OnInit {
  // Variables



  // List
  listCompany: DTOCompany[] = [];
  listSubSystem: DTOGroup[] = []





  //Function
  constructor(private companies: CompanyService, private subsystems: SubSystemService) { }

  ngOnInit(): void {
    this.getListCompany();
  }

  // get list company from API company service
  getListCompany() {
    this.companies.getCompany().subscribe(data => this.listCompany = data.dataCompany);
  }


  // get list company from API subsystem service
  getListSubSystem() {
    this.subsystems.getSubSystem().subscribe(data => this.listSubSystem = data.datasubsystem);
  }


}
