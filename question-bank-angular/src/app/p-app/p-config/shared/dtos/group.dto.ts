import { DTOFunction } from "./function.dto"

export class DTOGroup{
    ListGroup: DTOGroup[] | undefined
    ListFunctions: DTOFunction[] | undefined
    ListAPI: any
    Company: number | undefined // idCompany
    Code: number | undefined
    ProductID: any
    ModuleID: any
    Vietnamese: string | undefined
    English: string | undefined
    Japanese: string | undefined
    Chinese: string | undefined
    OrderBy: number | undefined
    GroupID: number | undefined
    IsVisible: boolean | undefined
    TypeData: any
    ImageSetting: any
    Icon: any

    constructor(Vietnamese?: string, code?: number) {
        if (Vietnamese !== undefined) {
            this.Vietnamese = Vietnamese;
        }
        if (code !== undefined) {
            this.Code = code;
        }
    }
}