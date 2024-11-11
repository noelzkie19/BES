import {SortDescriptor} from '@progress/kendo-data-query'
import {CurrencyFormatter, dateFormat} from '../../../shared/service/utils'
import {FIELD_COLUMN_MAP, FIELD_DEFAULT} from '../constant/config-map'
import {
  IEditData,
  IQuote,
  ISelectedClientData,
  ISelectedJobTypeData,
  Material,
} from '../models/quote-model'
import {INewEditData} from '../models/new-qoute-model'

export const transformDataClient = (clients: ISelectedClientData[]) => {
  return (clients || []).map((client) => ({
    value: client.id,
    label: client.name,
  }))
}
export const transformQuoteFilter = (filter: any) => {
  if (!filter) return filter

  let newFilter = (filter.filters || []).map((ft: any) => {
    const fieldMap = FIELD_COLUMN_MAP.find((cln) => cln.field === ft.field)

    ft = {
      ...ft,
      field: fieldMap?.map,
      type: fieldMap?.type,
    }
    return ft
  })

  return {...filter, filters: newFilter}
}
export const transformQuoteSort = (sort: SortDescriptor[]) => {
  const configSort: any = {
    ...sort[0],
    field: sort[0] ? sort[0].field : FIELD_DEFAULT.field,
    dir: sort[0] ? sort[0].dir : FIELD_DEFAULT.dir,
  }
  const fieldMap = FIELD_COLUMN_MAP.find((cln) => cln.field === configSort.field)
  const sortField = fieldMap ? fieldMap.map : configSort.field
  return {...configSort, field: sortField}
}
export const transformDataJobType = (jobType: ISelectedJobTypeData[]) => {
  return (jobType || []).map((jobType) => ({
    value: jobType.id,
    label: jobType.description,
  }))
}
export const transforSaveMaterial = (material: Material[]) => {
  return (material || []).map((add) => ({
    id: add.refId, // for datatable id must be uniq for new
    description: add.description,
    size: add.size,
    supplierId: add.supplierId,
    numberOrdered: '1',
    orderDate: add.orderDate,
    deliveryDate: add.deliveryDate,
    name: add.name,
    quantity: add.quantity,
    unitPrice: add.unitPrice,
    gst: add.gst,
    totalPrice: add.totalPrice,
    isDeleted: add.isDeleted,
    isEdit: false,
  }))
}
export const transforDataMaterial = (material: Material[]) => {
  return (material || []).map((material) => ({
    refId: material.id, // for datatable id must be uniq for new
    description: material.description,
    size: material.size,
    supplierId: material.supplierId,
    // numberOrdered: new Date(),
    // orderDate: new Date(),
    // deliveryDate: new Date(),
    numberOrdered: '1',
    orderDate: material.orderDate,
    deliveryDate: material.deliveryDate,
    name: material.name,
    quantity: material.quantity,
    unitPrice: material.unitPrice,
    gst: material.gst,
    totalPrice: material.totalPrice,
    isDeleted: material.isDeleted,
    isEdit: false,
  }))
}
export const transformCopyQuote = (editData: IQuote) => {
  return {
    ...editData,
    id: 0,
    jobId: 0,
    quoteNumber: 'Q',
    quoteNumberSource: editData.quoteNumber,
    quantityDelivered: 0,
    salesPrice: 0,
    materials: transformCopyQuoteMaterials(editData.materials),
    jobNotes: [],
  }
}

export const transformCopyQuoteMaterials = (material: Material[]) => {
  return (material || []).map((material) => ({
    refId: material.id, // for datatable id must be uniq for new
    description: material.description,
    size: material.size,
    supplierId: material.supplierId,
    // numberOrdered: new Date(),
    // orderDate: new Date(),
    // deliveryDate: new Date(),
    numberOrdered: '1',
    orderDate: material.orderDate,
    deliveryDate: material.deliveryDate,
    name: material.name,
    quantity: material.quantity,
    unitPrice: material.unitPrice,
    gst: material.gst,
    totalPrice: material.totalPrice,
    isDeleted: material.isDeleted,
    isEdit: false,
  }))
}
export const transformVersionQuote = (editData: IQuote) => {
  return {
    ...editData,
    id: 0,
    jobId: 0,
    quoteNumber: 'Q',
    quoteNumberSource: editData.quoteNumber,
    quantityDelivered: 0,
    salesPrice: 0,
    materials: transformVersionQuoteMaterials(editData.materials),
    jobNotes: [],
  }
}
export const transformVersionQuoteMaterials = (material: Material[]) => {
  return (material || []).map((material) => ({
    refId: material.id, // for datatable id must be uniq for new
    description: material.description,
    size: material.size,
    supplierId: material.supplierId,
    // numberOrdered: new Date(),
    // orderDate: new Date(),
    // deliveryDate: new Date(),
    numberOrdered: '1',
    orderDate: material.orderDate,
    deliveryDate: material.deliveryDate,
    name: material.name,
    quantity: material.quantity,
    unitPrice: material.unitPrice,
    gst: material.gst,
    totalPrice: material.totalPrice,
    isDeleted: material.isDeleted,
    isEdit: false,
  }))
}
export const transformVersionQuoteGrid = (quote: IQuote[]) => {
  return (quote || []).map((quote) => ({
    id: quote.id,
    number: quote.number,
    date: dateFormat(quote.date),
    estimationHours: quote.estimatedHours,
    quantity: quote.quantity,
    drawingNumber: quote.drawingNumber,
    revisionNumber: quote.revisionNumber,
    estimationCost: quote.estimationCost,
    clientId: quote.clientId,
    jobId: quote.jobId,
    quoteNumber: quote.quoteNumber,
    description: quote.description,
    quantityDelivered: quote.quantityDelivered,
    orderNumber: quote.orderNumber,
    ncrNumber: quote.ncrNumber,
    deliveryDate: quote.deliveryDate,
    startDate: quote.startDate,
    dueDate: quote.dueDate,
    estimatedHours: quote.estimatedHours,
    setupText: quote.setupText,
    completedBy: quote.completedBy,
    createdBy: quote.createdBy,
    delivered: quote.delivered,
    jobTypeId: quote.jobTypeId,
    materials: transformVersionQuoteMaterialGrid(quote.materials),
    name: quote.name,
    paymentTerms: quote.paymentTerms,
    estLeadTime: quote.estLeadTime,
    costPerItem: quote.costPerItem,
    // totalCost: CurrencyFormatter(quote.totalCost),
    totalCost: quote.totalCost,
    originalVersion: quote.originalVersion,
    version: quote.version,
    latestVersion: quote.latestVersion,
    quoteNumberSource: quote.quoteNumberSource,
    status: quote.status,
  }))
}
export const transformVersionQuoteMaterialGrid = (material: Material[]) => {
  return (material || []).map((material) => ({
    refId: material.id, // for datatable id must be uniq for new
    description: material.description,
    size: material.size,
    supplierId: material.supplierId,
    // numberOrdered: new Date(),
    // orderDate: new Date(),
    // deliveryDate: new Date(),
    numberOrdered: '1',
    orderDate: material.orderDate,
    deliveryDate: material.deliveryDate,
    name: material.name,
    quantity: material.quantity,
    unitPrice: material.unitPrice,
    gst: material.gst,
    totalPrice: material.totalPrice,
    isDeleted: material.isDeleted,
    isEdit: false,
  }))
}

export const transforOption = (versions: any) => {
  return (versions || []).map((version: any) => ({
    id: version.id, // for datatable id must be uniq for new
    text: version.quoteNumber,
  }))
}
