import { IAlert } from "../../../shared/components/CustomAlert";
import { GridSetup, IRole } from "../models/role-model";



export const ROLE_FORM_DEFAULT: IRole = {
    id: '',
    name: '',
    displayId: 0,
    
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