import { SortDescriptor } from '@progress/kendo-data-query';
import axios from 'axios'
import { IUserData, IUserSearch } from '../models/user-model'

export const USER_URL = `${process.env.REACT_APP_API_URL}/user`
export const ROLE_URL = `${process.env.REACT_APP_API_URL}/role`

export const getUsers = async (
    skip: number,
    take: number,
    pageSort: SortDescriptor,
    userSearch?: IUserSearch
) => {
    return await axios.post(`${USER_URL}/getuserswithpagination`, {
        ...userSearch,
        skip,
        take,
        sort: `${pageSort.field} ${pageSort.dir}`
    })
}

export const getUserById = async (keyword: any) => {
    return await axios.get(`${USER_URL}/getuserbyid?id=${keyword}`)
}


export const getAllRoles = async (keyword: any) => {
    return await axios.get(`${ROLE_URL}/getallroles${keyword ? '?keyword=' + keyword : '' }`)
}

export const createUser = async (form: IUserData) => {
    const payload: IUserData = form
    const response = await axios.post(`${USER_URL}`, payload)
    return response?.data ?? []
}

export const updateUser = async (form: IUserData) => {
    const payload: IUserData = form
    return await axios.put(`${USER_URL}`, payload)
}

export const deleteUser = async (form: IUserData) => {
    return await axios.delete(`${USER_URL}?id=${form.id}`)
}

export const forgotPassword = async (email: string) => {
    return await axios.post(`${USER_URL}/forgot-password` ,{email})
}

export const getAdminUsers = async () => {
    return await axios.get(`${USER_URL}/getadminusers`)
}

