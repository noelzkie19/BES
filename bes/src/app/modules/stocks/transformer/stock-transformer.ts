import { SortDescriptor } from "@progress/kendo-data-query";
import { IClient, IClientData } from "../../clients/models/client-model";
import { IJob } from "../models/stock-model";
import { FIELD_COLUMN_MAP, FIELD_DEFAULT } from "../constant/config-map";

export const transformStockSort = (sort: SortDescriptor[]) => {
    const configSort: any = {
        ...sort[0],
        field: sort[0] ? sort[0].field : FIELD_DEFAULT.field,
        dir: sort[0] ? sort[0].dir : FIELD_DEFAULT.dir
    }
    const fieldMap = FIELD_COLUMN_MAP.find(cln => cln.field === configSort.field);
    const sortField = fieldMap ? fieldMap.map : configSort.field;
    return { ...configSort, field: sortField };
}

export const transformStockFilter = (filter: any) => {
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

export const transformDataClient = (clients: IClient[]) => {
    return (clients || []).map((client) => ({
        value: client.id,
        label: client.name
    }))
}
export const transformDataJobs = (jobs: IJob[]) => {
    const data = (jobs || []).map((job) => ({
        value: job.id,
        label: job.jobId + ": "+   job.description as any
    }))
    // data.unshift({
    //     label: 'Please select source.',
    //     value: 0
    // })
    return data;
}