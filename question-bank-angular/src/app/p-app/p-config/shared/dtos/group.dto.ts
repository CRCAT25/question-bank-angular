import { DTOFunction } from "./function.dto"

export class DTOGroup{
    ListGroup?: DTOGroup[]
    ListFunctions?: any
    ListAPI?: any
    Company?: number // idCompany
    Code?: any
    ProductID?: any
    ModuleID?: any
    Vietnamese?: string
    English?: any
    Japanese?: any
    Chinese?: any
    OrderBy?: number
    GroupID?: number
    IsVisible?: boolean
    TypeData?: any
    ImageSetting?: any
    Icon?: any

    constructor(Vietnamese?: string, code?: number) {
        if (Vietnamese !== undefined) {
            this.Vietnamese = Vietnamese;
        }
        if (code !== undefined) {
            this.Code = code;
        }
    }
}