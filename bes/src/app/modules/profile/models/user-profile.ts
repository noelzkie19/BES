export interface IUserProfile {
    id?: number
    userName: string
    email: string
    firstName: string
    lastName: string
    isActive: string
    isResetPasswordRequired: boolean
    userRoles: string[]
}

export interface IUserData extends IUserProfile {
    status: string
    userRoleDisplay: string
}
