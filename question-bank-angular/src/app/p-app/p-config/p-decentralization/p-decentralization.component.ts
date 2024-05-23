import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { CompanyService } from '../shared/services/company.service';
import { DTOCompany } from '../shared/dtos/company.dto';
import { SubSystemService } from '../shared/services/subsystem.service';
import { DTOGroup } from '../shared/dtos/group.dto';
import { RoleService } from '../shared/services/role.service';
import { DTORole } from '../shared/dtos/role.dto';
import { DepartmentService } from '../shared/services/department.service';
import { DTODepartment } from '../shared/dtos/department.dto';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-p-decentralization',
  templateUrl: './p-decentralization.component.html',
  styleUrl: './p-decentralization.component.scss'
})
export class PDecentralizationComponent implements OnInit {
  // Variables & Object
  dataCompanyDefault: DTOCompany = {
    VNNameL: undefined,
    CompanyID: undefined,
    Bieft: 'Việt Hạ Chí',
    CountryName: undefined,
    TypeCompanyName: undefined,
    Code: 1,
    IsSystem: undefined
  }
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
    ListGroup: [],
    ListFunctions: [],
    ListAPI: [],
    Company: 0,
    Code: 0,
    ProductID: 0,
    ModuleID: 0,
    Vietnamese: 'Tất cả',
    English: "",
    Japanese: "",
    Chinese: "",
    OrderBy: 1,
    GroupID: 1,
    IsVisible: false,
    TypeData: "",
    ImageSetting: "",
    Icon: ""
  }

  
  selectedValueCompany: DTOCompany = this.dataCompanyDefault;
  selectedValueSubSystem?: DTOGroup;
  selectedValueDepartment: DTODepartment = this.dataDepartmentDefaul;



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

  selectedValueRole: DTORole[] = [];



  //Function
  constructor(
    private companies: CompanyService,
    private subsystems: SubSystemService,
    private roles: RoleService,
    private departments: DepartmentService,
    private renderer: Renderer2
    ) { }



  ngOnInit(): void {
    this.initData();
    // console.log(this.listOriginDataTree);
  }



  /**Get list company from API company service */
  getListCompany() {
    this.companies.getCompany().subscribe(data => this.listOriginCompany = data.dataCompany);
    this.addDefaultItem(this.listOriginCompany, new DTOCompany("-- Chọn --", 0));
    this.listDisplayedCompany = [...this.listOriginCompany];
  }



  /**Get list subsystem from API subsystem service */
  getListSubSystem() {
    this.subsystems.getSubSystem().subscribe(data => this.listOriginSubSystem = data.datasubsystem);
    this.addDefaultItem(this.listOriginSubSystem, this.dataSubSystemDefault);
    this.listDisplayedSubSystem.push(...this.listOriginSubSystem);
  }



  /**Get list role from API role service */
  getListRole() {
    this.roles.getRole().subscribe(data => this.listOriginRole = data.datarole);
    this.listOriginRole.push(...this.listOriginRoleOfPresidentDepartment);
    this.listDisplayedRole = [];
    this.listOriginRole.forEach(role => {
      if(role.Company === this.selectedValueCompany.Code){
        this.listDisplayedRole.push(role);
      }
    })
  }



  /**Get list roles of president department from API role service */
  getListRoleOfPresidentDepartment() {
    this.roles.getRolePresidentByDepartment().subscribe(data => this.listOriginRoleOfPresidentDepartment = data.dataRoleOfPresidentDepartment);
  }



  /**Get list departments from API department service */
  getListDepartment() {
    this.departments.getDepartment().subscribe(data => this.listOriginDepartment = data.dataDepartment);
    this.listDisplayedDepartment = [];
    this.listOriginDepartment.forEach(department => {
      if(department.Company === this.selectedValueCompany.Code){
        this.listDisplayedDepartment.push(department);
      }
    })
  }



  /**Get tree list from API subsystem service */
  getTreeList() {
    this.subsystems.getDataTreeList().subscribe(data => this.listOriginDataTree = data.dataTreeList);
    this.listDisplayedDataTree = [...this.listOriginDataTree];
  }



  /**Synthetic all method get list above */
  initData() {
    this.getListCompany();
    this.getListSubSystem();
    this.getListRoleOfPresidentDepartment();
    this.getListDepartment();
    this.getTreeList();
    this.getListRole();
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
   * This method is called when selecting an item in some list
   * @param valueGet value obtained when selecting an item in the list that is also valueField
   * @param valueSet variable use for contain value after run this method
   */
  valueChange(valueGet: any, valueSet: any) {
    if(valueGet){
      if(valueSet === this.selectedValueCompany){
        this.selectedValueCompany = valueGet;
        this.getListDepartment();
        this.getListRole();
      }
      if(valueSet === this.selectedValueDepartment){
        this.selectedValueDepartment = valueGet;
      }
      if(valueSet === this.selectedValueSubSystem){
        this.selectedValueSubSystem = valueGet;
        this.onSubsystemSelect(valueGet);
        console.log(this.listDisplayedDataTree);
      }
      if(valueSet === this.selectedValueRole){
        this.selectedValueRole = [...valueGet];
      }
    }

  }



  onFilterChange(searchTerm: string): void {
    // const contains = (value: string) => (item: { text: string; value: number }) =>
    //   item.text.toLowerCase().includes(value.toLowerCase());

    // this.listDisplayedRole = this.listOriginRole.filter(contains(searchTerm));
    console.log(searchTerm);
  }



  fetchChildren = (item: any): Observable<any[]> => {
    if (item.ListAction) return of(item.ListAction);

    else if (item.ListFunctions) return of(item.ListFunctions);

    else if (item.ListGroup) return of(item.ListGroup);

    return of([]);
  };



  hasChildren = (item: any): boolean => {
    return item.ListGroup?.length > 0 || item.ListFunctions?.length > 0 || item.ListAction?.length > 0
  };



  onSubsystemSelect(value: any) {
    // this.initiallyExpanded = true;
    if (value.Vietnamese && value.Vietnamese == 'Tất cả') {
      this.listDisplayedDataTree = this.listOriginDataTree;
    }
    else {
      const nullcheck = this.getListSubSystemDataModuleByID(value, this.listOriginDataTree)
      if(nullcheck){
        this.listDisplayedDataTree = [this.getListSubSystemDataModuleByID(value, this.listOriginDataTree)]
      }else{
        this.listDisplayedDataTree = []
      }
    }
  }


  
  getListSubSystemDataModuleByID(object: any, list: any[]): any {
    for (let module of list) {
      if (module.Code == object.Code) {
        return module;
      }

      if (module.ListGroup) {
        const result = this.getListSubSystemDataModuleByID(object, module.ListGroup);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }


  // generateColumns(data: DTORole[]) {
  //   let columns: any[] = [];
  //   data.forEach(role => {
  //     columns.push({ RoleName: role.RoleName, RoleID: role.RoleID, RoleCode: role.Code })
  //   });

  //   this.columnList = columns;
  //   this.initiallyExpanded = true;
  // }

  // inputCheckedCheck(ListOfRoles: DTORole[], checkedRoleID: number) : boolean {
  //   if(ListOfRoles){
  //     for(let role of ListOfRoles){
  //       if(role.RoleID.toString() == checkedRoleID.toString()){
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // }


}
