import { SortDescriptor } from '@progress/kendo-data-query'
import axios from 'axios'
import { IClientData, IEditData } from '../models/client-model'

export const CLIENT_URL = `${process.env.REACT_APP_API_URL}/client`
export const ACCOUNT_URL = `${process.env.REACT_APP_API_URL}/account`
export const CLIENT_EMAIL_HISTORY_URL = `${process.env.REACT_APP_API_URL}/clientemailhistory`

export const getClients = async (
    skip: number,
    take: number,
    pageSort: SortDescriptor,
    advanceSearch: string,
    search?: string,
) => {
    try {
        return await axios.post(`${CLIENT_URL}/getclientswithpagination`, {
            skip,
            take,
            sort: `${pageSort.field} ${pageSort.dir}`,
            advanceSearch: advanceSearch,
            search,
        })
    } catch (err) {
        return []
    }
}

export const createClient = async (form: IClientData) => {
    const payload: IClientData = form
    const response = await axios.post(`${CLIENT_URL}`, payload)
    return response?.data ?? []
}

export const updateClient = async (form: IEditData) => {
    const payload: IEditData = form
    return await axios.put(`${CLIENT_URL}`, payload)
}

export const deleteClient = async (form: IClientData) => {
    return await axios.delete(`${CLIENT_URL}?id=${form.id}`)
}

export const getAccounts = async (
) => {
    try {
        const response = await axios.get(`${ACCOUNT_URL}`)
        return response?.data ?? []
    } catch (err) {
        return []
    }
}

export const getClientEmailHistory = async (
    skip: number,
    take: number,
    pageSort: SortDescriptor,
    clientId?: number,
    search?: any
) => {
    try {
        const response =await axios.post(`${CLIENT_EMAIL_HISTORY_URL}/getclientemailhistorywithpagination`, {
            skip,
            take,
            ...search,
            sort: `${pageSort.field} ${pageSort.dir}`,
            clientId: clientId
        })
        return response?.data ?? []
    } catch (err) {
        return []
    }
}

export const getClientById = async (id: number) => {
  try {
    const data = await axios.get(`${CLIENT_URL}/getclientbyid?id=${id}`)
    return [data, null]
  } catch (ex) {
    return [null, ex]
  }
}
