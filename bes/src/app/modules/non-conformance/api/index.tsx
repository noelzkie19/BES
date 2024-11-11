import { SortDescriptor } from '@progress/kendo-data-query'
import axios from 'axios'
import { INonConformancePrintFilter } from '../models/config-model'
import { INoncoformanceData } from '../models/nonconformance-model'

export const NONCONFORMANCE_URL = `${process.env.REACT_APP_API_URL}/nonconformance`
export const USER_URL = `${process.env.REACT_APP_API_URL}/user`
export const PO_URL = `${process.env.REACT_APP_API_URL}/purchaseorder`
export const JOB_URL = `${process.env.REACT_APP_API_URL}/job`

export const getNonConformances = async (
    skip: number,
    take: number,
    pageSort: SortDescriptor,
    search?: any,
    advanceSearch?: string
) => {
    return await axios.post(`${NONCONFORMANCE_URL}/getnonconformancewithpagination`, {
        skip,
        take,
        sort: `${pageSort.field} ${pageSort.dir}`,
        advanceSearch,
        ...search
    })
}

export const getAllUsers = async () => {
    return await axios.get(`${USER_URL}`)
}

export const createNonConformance = async (form: INoncoformanceData) => {
    const payload: INoncoformanceData = form
    const response = await axios.post(`${NONCONFORMANCE_URL}`, payload)
    return response?.data ?? []
}

export const updateNonConformance = async (form: INoncoformanceData) => {
    const payload: INoncoformanceData = form
    await axios.put(`${NONCONFORMANCE_URL}`, payload)
}

export const getNonConformanceByid = async (id: any) => {
    try {
        const data = await axios.get(`${NONCONFORMANCE_URL}/getnonconformancebyid?id=${id}`)
        return [data, null]
    } catch (ex) {
        return [null, ex]
    }
}

export const deleteNonConformance = async (form: INoncoformanceData) => {
    return await axios.delete(`${NONCONFORMANCE_URL}?id=${form.id}`)
}

export const getNonConformanceAll = async (keyword?: any) => {
    return await axios.get(`${NONCONFORMANCE_URL}/getnonconformanceall`)
}

export const getAvailablePo = async (keyword?: any) => {
    return await axios.get(`${PO_URL}/getavailablePo`)
}



export const getNonConformancePrint = async (form: INonConformancePrintFilter) => {
    var { from, to,  ncrNumber,  sortBy, isAllNcrNumber, by } = form;
    let querySortBy = `${by} ${sortBy}`

    return await axios.post(`${NONCONFORMANCE_URL}/getnonconformanceprint`, {
        sortBy: querySortBy,
        ncrNumber: isAllNcrNumber ? '' : ncrNumber,
        dateFrom: from,
        dateTo: to
    })
}

export const getNewNCRnumber = async (keyword?: any) => {
    return await axios.get(`${NONCONFORMANCE_URL}/getnewncrnumber`)
}

export const getAllJobs = async () => {
    try {
        var data = await axios.get(`${JOB_URL}/getalljobs`)
        return [data, null]
    } 
    catch(err) {
        return [null, err]
    }
}



