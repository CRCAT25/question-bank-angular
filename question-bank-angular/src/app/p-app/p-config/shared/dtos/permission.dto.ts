export class DTOPermission {
    Code: number | undefined
    StaffID: any
    RoleID: number | undefined
    ActionID: number | undefined
    DataPermission: any
    Remark: any
    Permitted: boolean | undefined
    ListSubFunction: any
    FunctionName: any
    ActionName: any
    FunctionID: number | undefined
    ListDataPermission: DTOPermission[] | undefined
    Company: number | undefined
}