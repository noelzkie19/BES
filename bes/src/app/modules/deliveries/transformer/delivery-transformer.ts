import {SortDescriptor} from '@progress/kendo-data-query'
import {IClient} from '../../clients/models/client-model'
import {FIELD_COLUMN_MAP, FIELD_DEFAULT} from '../constant/delivery-default'
import {DeliveryJob, IDeliveryData} from '../models/delivery-model'
import {ISupplier} from '../../suppliers/models/supplier-model'

export const trasformDeliveryToSave = (delivery: DeliveryJob[]) => {
  const firstDelivery = delivery[0]

  return {
    date: new Date(),
    deliveryNumber: 0,
    supplierNumber: firstDelivery.supplierNumber,
    freight: firstDelivery.freight,
    notes: firstDelivery.notes,
    exportMyob: false,
    isCancelled: false,
    contactPhone: firstDelivery.contactPhone,
    contactPerson: firstDelivery.contactPerson,
    expanded: false,
    jobDeliveryLines: trasformDeliveryLineToSave(delivery),
  }
}

export const trasformDeliveryLineToSave = (deliveries: DeliveryJob[]) => {
  return (deliveries || []).map((delivery) => ({
    ...delivery,
  }))
}

export const trasformDeliveryLineToClient = (deliveryjob: IDeliveryData) => {
  return (deliveryjob.jobDeliveryLines || []).map((delivery) => ({
    clientId: delivery.clientId,
    clientName: delivery.clientName,
    street: delivery.street,
    suburb: delivery.suburb,
    state: delivery.state,
    postCode: delivery.postCode,
    deliveryNumber: delivery.deliveryNumber,
    date: deliveryjob.date,
    supplierNumber: delivery.supplierNumber,
    notes: delivery.notes,
    freight: delivery.freight,
  }))
}

export const transformDeliverySort = (sort: SortDescriptor[], fieldDefault: any) => {
  const configSort: any = {
    ...sort[0],
    field: sort[0] ? sort[0].field : fieldDefault.field,
    dir: sort[0] ? sort[0].dir : fieldDefault.dir,
  }
  const fieldMap = FIELD_COLUMN_MAP.find((cln) => cln.field === configSort.field)
  const sortField = fieldMap ? fieldMap.map : configSort.field
  return {...configSort, field: sortField}
}

export const transforClientOption = (clients: IClient[]): any => {
  let data: any = []
  data = (clients || []).map((client: any) => ({
    text: client.name,
    id: client.id,
  }))
  return data
}

export const transforOption = (address: ISupplier[]): any => {
  return (address || []).map((add) => ({
    label: add.name,
    value: add.id,
  }))
}
