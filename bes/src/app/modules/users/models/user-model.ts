import { CompositeFilterDescriptor, SortDescriptor } from "@progress/kendo-data-query"

export interface IUser {
    id?: number
    userName: string
    email: string
    firstName: string
    lastName: string
    isActive: string
    isResetPasswordRequired: boolean
    userRoles: string[]
    newPassword?: string
}

export interface IOption {
    value: string
    label: string
}

export interface IRole {
    id: string
    name: string
}

export interface IUserData extends IUser {
    status: string
    userRoleDisplay: string
    selectedData: IOption[]
}

export interface IColumns {
    name: string,
    cell?: (...args: any) => {},
    selector?: any,
    width: string
}

export interface IUserSearch {
    search?: string
    userId?: number
    userName?: string
    firstName?: string
    lastName?: string
    status?: boolean
}

export interface GridSetup 
{
    sort: Array<SortDescriptor>
    skip: number
    take: number
    filter?: CompositeFilterDescriptor 
}

export interface INcr {
    id?: number
    ncrNumber?: string
}