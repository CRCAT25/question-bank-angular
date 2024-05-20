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
  defaultValueCompany: number = 1;



  // List
  listOriginCompany: DTOCompany[] = [];
  listOriginSubSystem: DTOGroup[] = [];
  listOriginRole: DTORole[] = [];
  listOriginRoleOfPresidentDepartment: DTORole[] = [];
  listOriginDepartment: DTODepartment[] = [];
  listOriginDataTree: DTOGroup[] = [];

  listDisplayedCompany: DTOCompany[] = [];
  listDisplayedSubSystem: DTOGroup[] = [];
  listDisplayedRole: DTORole[] = [];
  listDisplayedRoleOfPresidentDepartment: DTORole[] = [];
  listDisplayedDepartment: DTODepartment[] = [];
  listDisplayedDataTree: DTOGroup[] = [];

  selectedValueCompany: number[] = [];



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
    this.getTreeList();

  }



  // get list company from API company service
  getListCompany() {
    this.companies.getCompany().subscribe(data => this.listOriginCompany = data.dataCompany);
    this.addDefaultItem(this.listOriginCompany, new DTOCompany("-- Chọn --", -1));
    this.listDisplayedCompany = [...this.listOriginCompany];
  }



  // get list subsystem from API subsystem service
  getListSubSystem() {
    this.subsystems.getSubSystem().subscribe(data => this.listOriginSubSystem = data.datasubsystem);
  }



  // get list role from API role service
  getListRole() {
    this.roles.getRole().subscribe(data => this.listOriginRole = data.datarole);
  }



  // get list roles of president department from API role service
  getListRoleOfPresidentDepartment() {
    this.roles.getRolePresidentByDepartment().subscribe(data => this.listOriginRoleOfPresidentDepartment = data.dataRoleOfPresidentDepartment);
  }



  // get list departments from API department service
  getListDepartment() {
    this.departments.getDepartment().subscribe(data => this.listOriginDepartment = data.dataDepartment);
  }



  // get tree list from API subsystem service
  getTreeList() {
    this.subsystems.getDataTreeList().subscribe(data => this.listOriginDataTree = data.dataTreeList);
  }



  /**
   * The method that is called when list need to push a new object at the start
   * @param list a list want to push item at the start
   * @param obj a object will be addedd into list
   */
  addDefaultItem(list: Array<any>, obj: Object) {
    list.unshift(obj);
  }



  /**
   * This method is called whenever typing into input search of list
   * @param displayedList list is displayed on screen
   * @param originList origin list is got from api
   * @param value value is got from input search
   * @param property property of Object belong to the displayedList
   */
  handleSearch(displayedList: Array<any>, originList: Array<any>, value: any, property: any) {
    const filteredList = originList.filter(
      (s) => s[property].toLowerCase().indexOf(value.toLowerCase()) !== -1
    );

    // Clear the contents of displayedList and push the filtered results
    displayedList.length = 0;
    displayedList.push(...filteredList);
  }



  /**
   * This method is called when to set valueGet into valueSet in dropdownlist
   * @param valueGet selected value on the screen
   * @param valueSet variable will be assign by valueGet
   */
  valueChange(valueGet: any, valueSet: number[]) {
    valueSet.length = 0;
    valueSet.push(valueGet);
  }
}
