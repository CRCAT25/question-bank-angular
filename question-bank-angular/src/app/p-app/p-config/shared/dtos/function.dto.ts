import { DTOAction } from "./action.dto";
import { DTOPermission } from "./permission.dto";
import { DTOSubFunction } from "./subfunction";

export class DTOFunction{
    ListAction: DTOAction[] | undefined
    ListDataPermission: DTOPermission[] | undefined
    ModuleName: string | undefined
    Breadcrumb: string | undefined
    ListSubFunction: DTOSubFunction[] | undefined
    Code: number | undefined
    ModuleID: number | undefined
    Vietnamese: string | undefined
    English: any
    Japanese: any
    Chinese: any
    OrderBy: any
    Hotkey: any
    TypeData: number | undefined
    DLLPackage: string | undefined
    ImageSetting: any
    Icon: any
    PermissionConf: any | undefined
}