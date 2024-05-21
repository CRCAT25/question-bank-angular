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
  // Variables & Object
  dataDepartmentDefaul: DTODepartment = {
    StatusName: undefined,
    ParentCode: undefined,
    ListLocationCode: undefined,
    ListLocation: undefined,
    ListDepartment: undefined,
    ListPosition: undefined,
    IsTree: undefined,
    Company: undefined,
    Code: 2,
    ParentID: undefined,
    DepartmentID: undefined,
    Department: 'Ban giám đốc',
    Brieft: undefined,
    Phone: undefined,
    Fax: undefined,
    Remark: undefined,
    Config: undefined,
    TypeData: undefined,
    OrderBy: undefined,
    StatusID: undefined
  }
  dataSubSystemDefault: DTOGroup = {
    ListGroup: undefined,
    ListFunctions: undefined,
    ListAPI: undefined,
    Company: undefined,
    Code: -1,
    ProductID: undefined,
    ModuleID: undefined,
    Vietnamese: 'Tất cả',
    English: undefined,
    Japanese: undefined,
    Chinese: undefined,
    OrderBy: undefined,
    GroupID: undefined,
    IsVisible: undefined,
    TypeData: undefined,
    ImageSetting: undefined,
    Icon: undefined
  }
  dataDepartmentDefault: DTODepartment = {
    StatusName: undefined,
    ParentCode: undefined,
    ListLocationCode: undefined,
    ListLocation: undefined,
    ListDepartment: undefined,
    ListPosition: undefined,
    IsTree: undefined,
    Company: undefined,
    Code: undefined,
    ParentID: undefined,
    DepartmentID: undefined,
    Department: undefined,
    Brieft: undefined,
    Phone: undefined,
    Fax: undefined,
    Remark: undefined,
    Config: undefined,
    TypeData: undefined,
    OrderBy: undefined,
    StatusID: undefined
  }



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

  selectedValueCompany: any[] = [];
  selectedValueSubSystem: number[] = [];



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
    console.log(this.listOriginDepartment);
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
    this.addDefaultItem(this.listOriginSubSystem, new DTOGroup("Tất cả", -1));
    this.listDisplayedSubSystem = [...this.listOriginSubSystem];
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
    this.listDisplayedDepartment = [...this.listOriginDepartment];
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
   * This method is called when selecting an item in some list. It will get valueGet
   * and find in originList, then assign that value for valueSet
   * @param valueGet value obtained when selecting an item in the list that is also valueField
   * @param valueSet variable use for contain value after run this method
   * @param originList the list use for filtering
   * @param propertyCondition condition property to compare to valueGet
   * @param propertyFound property need get of found object
   */
  valueChange(valueGet: any, valueSet: any[], originList: Array<any>, propertyCondition: any, propertyFound: any) {
    const valueFound = originList.find((a) => a[propertyCondition] === valueGet)
    valueSet.length = 0;
    valueSet.push(valueFound[propertyFound]);
  }
}
