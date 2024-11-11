import { SortDescriptor } from '@progress/kendo-data-query';
import axios from 'axios'
import { ISuppierPrintFilter } from '../models/config-model';
import { IEditData, ISupplierData } from '../models/supplier-model';

export const SUPPLIER_URL = `${process.env.REACT_APP_API_URL}/supplier`
export const USER_URL = `${process.env.REACT_APP_API_URL}/user`

export const getSuppliers = async (
    skip: number,
    take: number,
    pageSort: SortDescriptor,
    advanceSearch: string,
    search?: string
) => {

    return await axios.post(`${SUPPLIER_URL}/getsupplierswithpagination`, {
        skip,
        take,
        sort: `${pageSort.field} ${pageSort.dir}`,
        advanceSearch,
        search
    })
}

export const createSupplier = async (form: ISupplierData) => {
    const payload: ISupplierData = form
    const response = await axios.post(`${SUPPLIER_URL}`, payload)
    return response?.data ?? []
}

export const updateSupplier = async (form: IEditData) => {
    const payload: IEditData = form
    return await axios.put(`${SUPPLIER_URL}`, payload)
}

export const deleteSupplier = async (form: ISupplierData) => {
    return await axios.delete(`${SUPPLIER_URL}?id=${form.id}`)
}

export const getSupplierPrint = async (form: ISuppierPrintFilter) => {
    var { from, to,  supplier,  sortBy, isAllSupplier, by } = form;
    let querySortBy = `${by} ${sortBy}`

    return await axios.post(`${SUPPLIER_URL}/getsupplierprint`, {
        sortBy: querySortBy,
        supplier: isAllSupplier ? 0 : supplier,
        dateFrom: from,
        dateTo: to
    })
}

export const getSupplierAll = async (keyword?: any) => {
    return await axios.get(`${SUPPLIER_URL}/getsupplierall`)
}

export const getUserApproval = async (keyword: any) => {
    return await axios.get(`${USER_URL}${keyword ? '?keyword=' + keyword : '' }`)
}

export const getSupplierEmailHistories = async (
    skip: number,
    take: number,
    pageSort: SortDescriptor,
    supplierId?: number,
    search?: any
) => {
    try {
        const response =await axios.post(`${SUPPLIER_URL}/getsupplieremailhistorywithpagination`, {
            skip,
            take,
            ...search,
            sort: `${pageSort.field} ${pageSort.dir}`,
            supplierId: supplierId
        })
        return response?.data ?? []
    } catch (err) {
        return []
    }
}

export const getSupplierById = async (id: number) => {
  try {
    const data = await axios.get(`${SUPPLIER_URL}/getsupplierbyid?id=${id}`)
    return [data, null]
  } catch (ex) {
    return [null, ex]
  }
}
