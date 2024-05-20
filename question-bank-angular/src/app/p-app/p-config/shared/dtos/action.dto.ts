import { DTOPermission } from "./permission.dto"

export class DTOAction {
    ListAction: DTOAction[] | undefined
    ModuleName: string | undefined
    FunctionName: string | undefined
    ModuleID: number | undefined
    ListDataPermission: DTOPermission[] | undefined
    Code: number | undefined
    FunctionID: number | undefined
    ActionName: string | undefined
    TypeData: number | undefined
    ParentID: any
    IsVisible: boolean | undefined
    CreateBy: string | undefined
    CreateTime: any
    LastModifiedBy: string | undefined
    LastModifiedTime: any
    PermissionConf: any
}