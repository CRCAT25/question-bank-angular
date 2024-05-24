import { DTOPosition } from "./position.dto"

export class DTORole{
    ListPositionApply: DTOPosition[] | undefined
    Code: number | undefined
    Company: number | undefined
    RoleName: string | undefined
    IsSupperAdmin: boolean | undefined
    TypeData: number | undefined
    StaffID: any
    CreateBy: string | undefined
    CreateTime: Date | undefined
    LastModifiedBy: any
    LastModifiedTime: any
    RoleID: any
    Remark: any
    Role: any
    OrderBy: number | undefined
}