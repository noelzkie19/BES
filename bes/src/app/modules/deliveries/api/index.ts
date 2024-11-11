import { SortDescriptor } from "@progress/kendo-data-query"
import axios from "axios"
import { Tabs } from "../constant/config-default"
import { IDeliveryData, IDeliveryLine, IDeliveryPrintFilter } from "../models/delivery-model"

export const DELIVERY_URL = `${process.env.REACT_APP_API_URL}/delivery`
export const CLIENT_URL = `${process.env.REACT_APP_API_URL}/client`

export const getDeliveryData = async (
    skip: number,
    take: number,
    pageSort: SortDescriptor,
    search: any,
    selectedTab: number,
    tag: string
) => {
    try {
        const route = selectedTab === Tabs.pendingDeliveries ?
            'getdeliveriespendingwithpagination' : 'getdeliverieswithpaginationv2'

        const response = await axios.post(`${DELIVERY_URL}/${route}`, {
            tag,
            skip,
            take,
            sort: `${pageSort.field} ${pageSort.dir}`,
            ...search
        })
        return response?.data ?? []
    } catch (err) {
        return []
    }
}

export const createDeliveryOrders = async (form: IDeliveryData) => {
    try {
        const payload: IDeliveryData = form
        const data = await axios.post(`${DELIVERY_URL}`, payload)
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}


export const getDeliveriesReport = async (form: IDeliveryPrintFilter) => {
    const { sortBy, by } = form;
    const querySortBy = `${by} ${sortBy}`

    return await axios.post(`${DELIVERY_URL}/getdeliveriesreport`, {
        ...form,
        sortBy: querySortBy
    })
}


export const deleteDelivery = async (form: IDeliveryLine) => {
    const payload: IDeliveryLine = form
    await axios.delete(`${DELIVERY_URL}/undodelivery?id=${payload.deliveryNumber}`)
}


export const getClientAll = async (keyword?: any) => {
    return await axios.get(`${CLIENT_URL}/getclientall`)
}

export const getDeliveryLineById = async (
    id: string
) => {
    try {
        const data = await axios.get(`${DELIVERY_URL}/getdeliverylinebyid?id=${id}`)
        return [data, null] 
    } catch(ex) {
        return [null, ex] 
    }
}

export const getDeliveryLineByNumber = async (
    id: string
) => {
    try {
        const data = await axios.get(`${DELIVERY_URL}/getdeliverylinebynumber?id=${id}`)
        return [data, null] 
    } catch(ex) {
        return [null, ex] 
    }
}

