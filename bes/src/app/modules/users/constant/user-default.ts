import { IAlert } from "../../../shared/components/CustomAlert";
import { GridSetup, IOption, IUserData, IUserSearch } from "../models/user-model";

export const USER_FORM_DEFAULT: IUserData = {
    id: 0,
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    isActive: '1',
    isResetPasswordRequired: false,
    userRoles: [],
    status: '',
    userRoleDisplay: '',
    selectedData: []
}

export const USER_STATUS: IOption[] = [
    { value: '1', label: 'Active' },
    { value: '0', label: 'Inactive' }
]

export const SEARCH_DEFAULT: IUserSearch = {
    search: '',
    userName: '',
    firstName: '',
    lastName: '',
    status: true
}

export const Initial_GridSetup: GridSetup = {
    sort: [{ field: 'id', dir: 'desc' }],
    skip: 0,
    take: 35,
    filter: {
        logic: "and",
        filters: [],
    }
}

export const TOASTER_DEFAULT: IAlert = {
    message: ``,
    header: ``,
    type: 'success'
}
