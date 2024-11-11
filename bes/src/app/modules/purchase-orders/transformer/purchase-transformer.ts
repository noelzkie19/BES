import { SortDescriptor } from "@progress/kendo-data-query"
import { ISupplier } from "../../suppliers/models/supplier-model"
import { FIELD_COLUMN_MAP, FIELD_DEFAULT } from "../constant/config-default"
import { IJob, IPurchaseData, IPurchaseReceipt, PurchaseLine } from "../models/purchase-model"

export const transforOption = (address: ISupplier[]): any => {
    return (address || []).map((add) => ({
        label: add.name,
        value: add.id
    }))
}

export const transforQtyReceiveOption = (purchaseReceipts: IPurchaseReceipt[]): any => {
    return (purchaseReceipts.reverse() || []).map((receipt, index) => ({
        label: receipt.quantity,
        value: index
    }))
}

export const transforJobOption = (job: IJob[]): any => {
    let data: any = [];
    if (job.length > 0)
        data = (job || []).map((add) => (
        {
            text: add.jobId,
            id: add.id,
            description: add.description
        }))
        // data.unshift({
        //     text: 'None',
        //     id: 0,
        //     description: ''
        // })

    return data;
    
}


export const trasformPurchaseToSave = (purchase: IPurchaseData) => {
    return {
        ...purchase,
        date: purchase.date === '' ? null : purchase.date,
        printedDate: purchase.printedDate === '' ? null : purchase.printedDate,
        purchaseLines: trasformPurchaseLineToSave(purchase.purchaseLines)
    }
}


export const trasformPurchaseLineToSave = (purchaseLines: PurchaseLine[]) => {
    return (purchaseLines || []).map((po) => ({
        ...po,
        dueDate: po.dueDate === '' ? null : po.dueDate,
        id: po.refId,
        jobId: po.jobId === 0 ? null : po.jobId,
        purchaseReceipts: po.purchaseReceipts.filter(x => x.id === 0)
            .map((receipt) => ({
                ...receipt,
                date: receipt.date === '' ? null : receipt.date
            })),
        errorMessage: po.quantity <= 0 ? 'Qty field should not be able to go below 0' : null
    }))
}

export const trasformPurchaseLineToGrid = (purchaseLines: PurchaseLine[]) => {
    return (purchaseLines || []).map((po) => ({
        ...po,
        refId: po.id,
        dueDate: po.dueDate ? new Date(po.dueDate) : null
    }))
}

export const trasformPurchaseReceipt = (purchaseLine: PurchaseLine, supplierName: string, dataIndex: number,
    date: any, created: any, selectedJob: any, lotNumber: string) => {
    return {
        id: 0,
        purchaseLineNumber: purchaseLine.purchaseLineNumber,
        supplierName: supplierName,
        purchaseNumber: purchaseLine.purchaseLineNumber,
        decription: purchaseLine.description,
        jobId: purchaseLine.jobId,
        poQuantity: purchaseLine.quantity,
        clientName: selectedJob !== undefined ? selectedJob.client.name : '',
        jobDescription: selectedJob !== undefined ? selectedJob.description : purchaseLine.jobDescription,
        date: null,
        quantity: 0,
        packingSlipNumber: '',
        heatNumber: '',
        note: '',
        lotNumber: lotNumber,
        goodInspctReceivedBy: '',
        previousReceived: [],
        dataIndex,
        historyReceipts: purchaseLine.purchaseReceipts,
        dueDate: purchaseLine.dueDate,
        purchaseDate: date,
        created: created,
        displayJobId: selectedJob !== undefined ? selectedJob.jobId : purchaseLine.displayJobId,
        quantityDelivered: purchaseLine.quantityDelivered,
        displayPurchaseNumber: purchaseLine.purchaseNumber,
        quantityReceived: purchaseLine.purchaseReceipts.reduce((sum, receipt) => sum + receipt.quantity, 0),
        quantityPreviouslyReceived: purchaseLine.purchaseReceipts.reduce((sum, receipt) => sum + receipt.quantity, 0)
    }
}


export const trasformPurchaseReceiptToSave = (receipt: IPurchaseReceipt) => {
    return {
        id: receipt.id,
        purchaseLineNumber: receipt.purchaseLineNumber,
        date: receipt.date === '' ? null : receipt.date,
        quantity: receipt.quantity,
        packingSlipNumber: receipt.packingSlipNumber,
        heatNumber: receipt.heatNumber,
        lotNumber: receipt.lotNumber,
        goodInspctReceivedBy: receipt.goodInspctReceivedBy,
        note: receipt.note,
        created: receipt.created
    }
}

export const transformPurchaseSort = (sort: SortDescriptor[]) => {
    const configSort: any = {
        ...sort[0],
        field: sort[0] ? sort[0].field : FIELD_DEFAULT.field,
        dir: sort[0] ? sort[0].dir : FIELD_DEFAULT.dir
    }
    const fieldMap = FIELD_COLUMN_MAP.find(cln => cln.field === configSort.field);
    const sortField = fieldMap ? fieldMap.map : configSort.field;
    return { ...configSort, field: sortField };
}

export const transformPurchaseFilter = (filter: any) => {
    if (!filter)
        return filter;

    let newFilter = (filter.filters || []).map((ft: any) => {
        const fieldMap = FIELD_COLUMN_MAP.find(cln => cln.field === ft.field);
   
        ft = {
            ...ft,
            field: fieldMap?.map,
            type: fieldMap?.type
        }
        return ft;
    });

    return { ...filter, filters: newFilter};
}