import { IOption, IRole } from "../models/user-model"


export const transformSaveAdminRoles = (option: IOption[]) => {
    return (option || []).map((add) => (add.value))
}

export const transformDataAdminRoles = (roles: string[]) => {
    return (roles || []).map((role) => ({
        value: role,
        label: role
    }))
}

export const transformDataStatus = (status: string) => {
    return status ==='Active' ? '1' : '0';
}

export const transformDataRoles = (roles: IRole[]) => {
    return (roles || []).map((role) => ({
        value: role.name,
        label: role.name
    }))
}