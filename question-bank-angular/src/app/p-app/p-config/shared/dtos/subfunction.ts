import { DTOPermission } from "./permission.dto"

export class DTOSubFunction{
    IsSelected: boolean | undefined
    ListDataPermission: DTOPermission[] | undefined
    Code: number | undefined
    DataID: string | undefined
    DataName: string | undefined
    DataDescription: string | undefined
    TypeData: number | undefined
    FunctionID: number | undefined
    OrderBy: number | undefined
    TypePopup: number | undefined
    Config: any
    DataPermission: any
    ReportConfig: any
}