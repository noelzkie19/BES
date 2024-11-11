import { CompositeFilterDescriptor, SortDescriptor } from "@progress/kendo-data-query"

export interface IClientEmailHistory {
    id?: number
    clientId: number
    emailDate: string
    emailType: string
    emailedBy: string
    referenceNumber: string
    filePath: string
    sendName: string
}
export interface GridSetupClientEmailHistory 
{
    sort: Array<SortDescriptor>
    skip: number
    take: number
    filter: CompositeFilterDescriptor
}