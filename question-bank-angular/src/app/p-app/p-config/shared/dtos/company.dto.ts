export class DTOCompany{
    VNNameL: string | undefined
    CompanyID: string | undefined
    Bieft: string | undefined
    CountryName: string | undefined
    TypeCompanyName: string | undefined
    Code: number | undefined
    IsSystem: boolean | undefined

    constructor(bieft?: string, code?: number) {
        if (bieft !== undefined) {
            this.Bieft = bieft;
        }
        if (code !== undefined) {
            this.Code = code;
        }
    }
}