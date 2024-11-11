import { SortDescriptor } from '@progress/kendo-data-query'
import axios from 'axios'
import { IPurchaseData } from '../models/purchase-model'
import { IFile } from '../models/file'


export const PO_URL = `${process.env.REACT_APP_API_URL}/purchaseorder`
export const SUPPLIER_URL = `${process.env.REACT_APP_API_URL}/supplier`
export const JOB_URL = `${process.env.REACT_APP_API_URL}/job`

export const getPurchaseOrders = async (
    skip: number,
    take: number,
    pageSort: SortDescriptor,
    search?: string,
    advanceSearch?: string,
    printState?: string,
    orderStatus?: string,
    internal?: string
) => {
    try {
        const response = await axios.post(`${PO_URL}/purchaseorderwithpaginationv2`, {
          skip,
          take,
          search,
          advanceSearch,
          sort: `${pageSort.field} ${pageSort.dir}`,
          printState: printState,
          orderStatus: orderStatus,
          internal: internal
        })
        return response?.data ?? []
    } catch (err) {
        return []
    }
}


export const getPurchaseById = async (
    id: string
) => {
    try {
        const data = await axios.get(`${PO_URL}/getpurchasebyid?id=${id}`)
        return [data, null] 
    } catch(ex) {
        return [null, ex] 
    }
}


export const createPurchaseOrders = async (form: IPurchaseData) => {
    const payload: IPurchaseData = form
    const response = await axios.post(`${PO_URL}`, payload)
    return response?.data ?? []
}

export const updatePurchaseOrders = async (form: IPurchaseData) => {
    const payload: IPurchaseData = form
    await axios.put(`${PO_URL}`, payload)
}

export const deletePurchaseOrder = async (form: IPurchaseData) => {
    await axios.delete(`${PO_URL}?id=${form.id}`)
}


export const getSuppliers = async (keyword?: any) => {
    return await axios.get(`${SUPPLIER_URL}/getsupplierall`)
}

export const getJobs = async (keyword?: any) => {
    try {
        var data = await axios.get(`${PO_URL}/getavailablejob`, keyword)
        return [data, null]
    } 
    catch(err) {
        return [null, err]
    }
}

export const getLastPoNumber = async (keyword?: any) => {
    return await axios.get(`${PO_URL}/getlastponumber`)
}


export const sendPurchasePrint = (file: any, sendEmails: string[],
        userName: any, poNumber: any , id: any, supplierName: any, messageBody: string, subject: string,
        ccs: string[],
        bccs: string[],
        extracted: string[],
        attachments: IFile[],
        fromEmail: string) => {
    return new Promise((resolve, reject) => {
        var form = new FormData();
        form.append('sendTo', sendEmails.join(';'));
        form.append('base64Ids', extracted.join(';'));
        form.append('userName', userName);
        form.append('Attachment', file);
        form.append('poNumber', poNumber);
        form.append('supplierName', supplierName);
        form.append('messageBody', messageBody);
        form.append('subject', subject);
        form.append('id', id);
        form.append('ccs', ccs.join(';'));
        form.append('bccs', bccs.join(';'));
        form.append('fromEmail', fromEmail);
        
        attachments.forEach(attachment => {
            form.append('Attachments', attachment.file);
        });
        axios.post(`${PO_URL}/sendpurchaseprint`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(resolve).catch(reject);
    });
}


export const updatePrintDate = async (poId: number, printDate: Date) => {
    return await axios.post(`${PO_URL}/updateprintdate`, {
        id: poId,
        PrintedDate: printDate
    });
}
