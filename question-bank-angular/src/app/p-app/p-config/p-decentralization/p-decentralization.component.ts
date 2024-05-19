import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../shared/services/company.service';
import { DTOCompany } from '../shared/dtos/company.dto';
import { SubSystemService } from '../shared/services/subsystem.service';
import { DTOGroup } from '../shared/dtos/group.dto';
import { RoleService } from '../shared/services/role.service';
import { DTORole } from '../shared/dtos/role.dto';
import { DepartmentService } from '../shared/services/department.service';
import { DTODepartment } from '../shared/dtos/department.dto';

@Component({
  selector: 'app-p-decentralization',
  templateUrl: './p-decentralization.component.html',
  styleUrl: './p-decentralization.component.scss'
})
export class PDecentralizationComponent implements OnInit {
  // Variables



  // List
  listCompany: DTOCompany[] = [];
  listSubSystem: DTOGroup[] = [];
  listRole: DTORole[] = [];
  listRoleOfPresidentDepartment: DTORole[] = [];
  listDepartment: DTODepartment[] = [];



  //Function
  constructor(
    private companies: CompanyService,
    private subsystems: SubSystemService,
    private roles: RoleService,
    private departments: DepartmentService
  ) { }



  ngOnInit(): void {
    this.getListCompany();
    this.getListSubSystem();
    this.getListRole();
    this.getListRoleOfPresidentDepartment();
    this.getListDepartment();
  }



  // get list company from API company service
  getListCompany() {
    this.companies.getCompany().subscribe(data => this.listCompany = data.dataCompany);
  }



  // get list subsystem from API subsystem service
  getListSubSystem() {
    this.subsystems.getSubSystem().subscribe(data => this.listSubSystem = data.datasubsystem);
  }
  


  // get list role from API role service
  getListRole() {
    this.roles.getRole().subscribe(data => this.listRole = data.datarole);
  }



  // get list roles of president department from API role service
  getListRoleOfPresidentDepartment() {
    this.roles.getRolePresidentByDepartment().subscribe(data => this.listRoleOfPresidentDepartment = data.dataRoleOfPresidentDepartment);
  }
  


  // get list departments from API department service
  getListDepartment() {
    this.departments.getDepartment().subscribe(data => this.listDepartment = data.dataDepartment);
  }
}
