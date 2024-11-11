
import { SortDescriptor } from "@progress/kendo-data-query"
import { IState } from "react-use/lib/usePermission"
import { IStates } from "../../clients/models/config-model"
import { DeliveryJob, IDeliveryData } from "../../deliveries/models/delivery-model"
import { INcr, IUser } from "../../users/models/user-model"
import { FIELD_COLUMN_MAP, FIELD_DEFAULT } from "../constant/config-default"
import { IEditData, IJobDelivery, IJobPurchaseData, IResourcesData, ISelectedClientData, ISelectedJobTypeData, JobNote, Operation, OperationOperator, OperationResource } from "../models/job-model"


export const transformDataClient = (clients: ISelectedClientData[]) => {
    return (clients || []).map((client) => ({
        value: client.id,
        label: client.name
    }))
}

export const transformDataJobType = (jobType: ISelectedJobTypeData[]) => {
    return (jobType || []).map((jobType) => ({
        value: jobType.id,
        label: jobType.description
    }))
}

export const transformResourcesOption = (resources: IResourcesData[]) => {
    return (resources || []).map((resource) => ({
        text: resource.name,
        id: resource.id
    }))
}

export const transformStatesOption = (states: IStates[]) => {
    return (states || []).map((state) => ({
        text: state.value,
        id: state.code
    }))
}


export const transformOptionToResources = (optionIds: [], operationId: number) => {
    return (optionIds || []).map((option) => ({
        operationId: operationId,
        resourcesId: option
    }))
}

export const transformUserOption = (users: IUser[]) => {
    return (users || []).map((user) => ({
        text: `${user.firstName} ${user.lastName}`,
        id: user.id
    }))
}

export const transformNCROption = (ncrdata: INcr[]) => {
    return (ncrdata || []).map((ncr) => ({
        text: ncr.ncrNumber,
        id: ncr.ncrNumber
    }))
}


export const transformDataOperations = (operations: Operation[]) => {
    return (operations || []).map((add) => ({
        refId: add.id, // for datatable id must be uniq for new
        number: add.number,
        description: add.description,
        dateCompleted: add.dateCompleted, 
        hours: add.hours,
        quantity: add.quantity,
        priority: add.priority,
        notes: add.notes,
        progDone: add.progDone,
        quoteId: add.quoteId,
        expectedProcessTime: add.expectedProcessTime,
        prog: add.prog,
        set: add.set,
        run: add.run,
        other: add.other,
        operatorId: add.operatorId,
        isEdit: add.isEdit,
        isDeleted: add.isDeleted,
        resource: add.resource,
        resourceId: add.resourceId,
        // firstFocHr: add.firstFocHr,
        // firstFocOperatorId: add.firstFocOperatorId,
        // secondFocHr: add.secondFocHr,
        // secondFocOperatorId: add.secondFocOperatorId,
        // thirdFocHr: add.thirdFocHr,
        // thirdFocOperatorId: add.thirdFocOperatorId,
        // fourthFocHr: add.fourthFocHr,
        // fourthFocOperatorId: add.fourthFocOperatorId,
        // firstPcHr: add.firstPcHr,
        // firstPcOperatorId: add.firstPcOperatorId,
        // secondPcHr: add.secondPcHr,
        // secondPcOperatorId: add.secondPcOperatorId,
        // thirdPcHr: add.thirdPcHr,
        // thirdPcOperatorId: add.thirdPcOperatorId,
        // fourthPcHr: add.fourthPcHr,
        // fourthPcOperatorId: add.fourthPcOperatorId,
        hourlyRate: add.hourlyRate,
        proInsFirst1: add.proInsFirst1,
        proInsFirst2: add.proInsFirst2,
        proInsFirst3: add.proInsFirst3,
        proInsINS: add.proInsINS
    }))
}

export const transforOperationResource = (resources: OperationResource[]) => {
    return (resources || []).map((nt) => (nt.resourcesId))
}

export const transforOperationOperator = (resources: OperationOperator[]) => {
    return (resources || []).map((nt) => (nt.userId))
}

export const transformSaveOperations = (operations: Operation[]) => {
    return (operations || []).map((opr) => ({
        id: opr.refId, // for datatable id must be uniq for new
        number: opr.number,
        description: opr.description,
        dateCompleted: opr.dateCompleted, 
        hours: opr.hours,
        quantity: opr.quantity,
        priority: opr.priority,
        notes: opr.notes,
        progDone: opr.progDone,
        quoteId: opr.quoteId,
        expectedProcessTime: opr.expectedProcessTime,
        prog: opr.prog,
        set: opr.set,
        run: opr.run,
        other: opr.other,
        operatorId: opr.operatorId,
        isEdit: false,
        isDeleted: opr.isDeleted,
        resource: opr.resource,
        resourceId: opr.resourceId,
        // firstFocHr: opr.firstFocHr,
        // firstFocOperatorId: opr.firstFocOperatorId,
        // secondFocHr: opr.secondFocHr,
        // secondFocOperatorId: opr.secondFocOperatorId,
        // thirdFocHr: opr.thirdFocHr,
        // thirdFocOperatorId: opr.thirdFocOperatorId,
        // fourthFocHr: opr.fourthFocHr,
        // fourthFocOperatorId: opr.fourthFocOperatorId,
        // firstPcHr: opr.firstPcHr,
        // firstPcOperatorId: opr.firstPcOperatorId,
        // secondPcHr: opr.secondPcHr,
        // secondPcOperatorId: opr.secondPcOperatorId,
        // thirdPcHr: opr.thirdPcHr,
        // thirdPcOperatorId: opr.thirdPcOperatorId,
        // fourthPcHr: opr.fourthPcHr,
        // fourthPcOperatorId: opr.fourthPcOperatorId,
        hourlyRate: opr.hourlyRate,
        proInsFirst1: opr.proInsFirst1,
        proInsFirst2: opr.proInsFirst2,
        proInsFirst3: opr.proInsFirst3,
        proInsINS: opr.proInsINS
    }))
}

export const transformSaveNotes = (notes: JobNote[]) => {
    return (notes || []).map((nt) => ({
        id: nt.refId, // for datatable id must be uniq for new
        note: nt.note,
        date: nt.date,
        createdBy: nt.createdBy,
        isEdit: false,
        isDeleted: nt.isDeleted
    }))
}

export const transformSaveJobPurchase = (purchases: IJobPurchaseData[]) => {
    return (purchases || []).map((purchase) => ({
       ...purchase,
       purchaseReceipts: []
    }))
}


export const transformSavePurchases = (purchases: IJobPurchaseData[]) => {
    return (purchases || []).map((po) => (po.purchaseLineNumber))
}

export const transformLoadPurchases = (purchases: IJobPurchaseData[], isCopy: boolean) => {
    return (purchases || []).map((po) => ({
        ...po,
        isSelected: isCopy
    }))
}


export const transformDataNotes = (notes: JobNote[]) => {
    return (notes || []).map((nt) => ({
        note: nt.note,
        date: nt.date,
        createdBy: nt.createdBy,
        refId: nt.id,
        isEdit: false,
        isDeleted: nt.isDeleted,
        createdByName: nt.createdByName
    }))
}

export const transformSaveResource = (resources: [],  operationId: any) => {
    return (resources || []).map((nt) => ({
        resourcesId: nt,
        operationId: operationId
    }))
}

export const transformSaveOperator = (operators: [], operationId: any) => {
    return (operators || []).map((ops) => ({
        userId: ops,
        operationId: operationId
    }))
}



export const transformCopyJob = (editData: IEditData) => {
    return {
        ...editData,
        id: 0,
        jobId: 0,
        jobNumber: 0,
        orderNumber: '',
        quantity: 0,
        quantityDelivered: 0,
        salesPrice: 0,
        jobDatePrinted: null,
        operations: []// operations: transformCopyJobOperations(editData.operations), this will load by request api
    }
}

export const transformDelivery: any = (delivery: any, currentUserName: string) => {
    return {
        id: delivery.id,
        deliveryNumber: delivery.deliveryNumber,
        deliveryDate: new Date(),
        createdBy: currentUserName,
        quantitySent: delivery.quantitySent
    }
}

export const transformCopyJobOperations = (operations: Operation[]) => {
    return (operations || []).map((add) => ({
        id: 0,
        number: add.number,
        description: add.description,
        dateCompleted: add.dateCompleted,
        hours: 0,
        quantity: add.quantity,
        priority: add.priority,
        notes: add.notes,
        progDone: add.progDone,
        quoteId: add.quoteId,
        expectedProcessTime: add.expectedProcessTime,
        prog: add.prog,
        set: add.set,
        run: add.run,
        other: add.other,
        operatorId: add.operatorId,
        isEdit: add.isEdit,
        isDeleted: add.isDeleted,
        resource: add.resource
        // operationResources: add.operationResources,
        // operationOperators: add.operationOperators,
        // resourceOptions: add.resourceOptions,
        // operatorOptions: add.operatorOptions
    }))
}

export const transformJobToDelivery = (editData: IEditData) => {
    return (
        [{
            id: editData.id,
            jobNumber: editData.jobNumber,
            jobId: editData.jobId,
            deliveryId: 0,
            quantitySent: 0,
            clientId: editData.clientId,
            clientName: '',
            orderNumber: editData.orderNumber,
            drawingNumber: editData.drawingNumber,
            revisionNumber: editData.revisionNumber,
            description: editData.description,
            quantity: editData.quantity,
            quantityDelivered: 0,
            dueDate: editData.dueDate,
            isSelected: false,
            isEdit: false
        }] 
    ) 
}
export const transformJobFilter = (filter: any) => {
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

export const transformJobSort = (sort: SortDescriptor[]) => {
    const configSort: any = {
        ...sort[0],
        field: sort[0] ? sort[0].field : FIELD_DEFAULT.field,
        dir: sort[0] ? sort[0].dir : FIELD_DEFAULT.dir
    }
    const fieldMap: any = FIELD_COLUMN_MAP.find(cln => cln.field === configSort.field);
    const sortField = fieldMap ? fieldMap.map : configSort.field;
    return { ...configSort, field: sortField };
}


export const transformCheckEdit = (ops: any, field: string) => {
    const data = {
        hr: ops[`${field}Hr`],
        operatorId: ops[`${field}OperatorId`]
    };
    return data;
}

export const transformCheckToSave = (form: any, field: string) => {
    const data = {
        [`${field}Hr`]: form.hr,
        [`${field}OperatorId`]: form.operatorId
    };
    return data;
}




