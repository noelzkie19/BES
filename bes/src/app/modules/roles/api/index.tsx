import { SortDescriptor } from '@progress/kendo-data-query';
import axios from 'axios';
import { IRole, IRoleSearch } from '../models/role-model';

export const ROLE_URL = `${process.env.REACT_APP_API_URL}/role`
export const getRoles = async (
    skip: number,
    take: number,
    pageSort: SortDescriptor,
    roleSearch?: IRoleSearch,

) => {

    return await axios.post(`${ROLE_URL}/getroles`, {
        ...roleSearch,
        sort: `${pageSort.field} ${pageSort.dir}`,
        skip,
        take
    })
}


export const getRoleById = async (keyword: any) => {
    return await axios.get(`${ROLE_URL}/getrolebyid?id=${keyword}`)
}

export const createRole = async (form: IRole) => {
    const payload: IRole = form
    const response = await axios.post(`${ROLE_URL}`, payload)
    return response?.data ?? []
}

export const updateRole = async (form: IRole) => {
    const payload: IRole = form
    return await axios.put(`${ROLE_URL}`, payload)
}

export const deleteRole = async (form: IRole) => {
    return await axios.delete(`${ROLE_URL}?id=${form.id}`)
}
