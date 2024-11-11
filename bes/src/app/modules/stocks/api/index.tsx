import axios from 'axios'
import { JOB_SEARCH_DEFAULT, SEARCH_DEFAULT } from '../constant/stock-default';
import { IClientSearch, IJobSearch, IStockPrintFilter, IStocks, IStockSearch } from '../models/stock-model'
import { SortDescriptor } from '@progress/kendo-data-query'
import { CLIENT_URL } from '../../clients/api';
export const STOCK_URL = `${process.env.REACT_APP_API_URL}/stock`
export const JOB_URL = `${process.env.REACT_APP_API_URL}/job`


export const createStock = async (form: IStocks) => {
    const payload: IStocks = form
    const response = await axios.post(`${STOCK_URL}`, payload)
    return response?.data ?? []
}
export const updateStock = async (form: IStocks) => {
    const payload: IStocks = form
    return await axios.put(`${STOCK_URL}`, payload)
}
export const deleteStock = async (form: IStocks) => {
    return await axios.delete(`${STOCK_URL}?id=${form.id}`)
}


export const getStock = async (
    skip: number,
    take: number,
    pageSort: SortDescriptor,
    search?: string,
    advanceSearch?: string
) => {
    try {
        const response =await axios.post(`${STOCK_URL}/getstockswithpagination`, {
            skip,
            take,
            search,
            advanceSearch,
            sort: `${pageSort.field} ${pageSort.dir}`,
        })
        return response?.data ?? []
    } catch (err) {
        return []
    }
}

export const getClients = async (
) => {
    try {
        return await axios.get(`${CLIENT_URL}/getclientlist`, {
        })
    } catch (err) {
        return []
    }
}

export const getStockById = async (id: any) => {
        try {
            const data = await axios.get(`${STOCK_URL}/getstockbyid`, {
                params: {
                  id: id
                }
            })
            return [data, null] 
        } catch (err) {
            return [null, err] 
        }
    }
    


export const getJobs = async (
    clientId: number
) => {
    if(clientId === undefined)
        return []

    try {
        const params = `ClientId=${clientId}`
        const response = await axios.get(`${JOB_URL}/getjobbyclientid?${params}`)       
        return response?.data ?? []
    } catch (err) {
        return []
    }
}

export const getStockPrint = async (form: IStockPrintFilter) => {
    var { client, sortBy, isAllClient } = form;
    let querySortBy = `${sortBy}`

    return await axios.post(`${STOCK_URL}/getstockprint`, {
        sortBy: querySortBy,
        clientId: isAllClient ? 0 : client,
    })
}