import { CompositeFilterDescriptor, SortDescriptor } from "@progress/kendo-data-query"

export interface IRole {
    id?: string
    name: string,
    displayId: number
}

export interface IRoleSearch {
    search?: string
    name?: string
}

export interface GridSetup 
{
    sort: Array<SortDescriptor>
    filter: CompositeFilterDescriptor
    skip: number
    take: number
}