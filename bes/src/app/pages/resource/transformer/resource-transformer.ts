import { SortDescriptor } from "@progress/kendo-data-query";
import { FIELD_COLUMN_MAP, FIELD_DEFAULT } from "../models/config-model";

export const transformResourceSort = (sort: SortDescriptor[]) => {
    const configSort: any = {
        ...sort[0],
        field: sort[0] ? sort[0].field : FIELD_DEFAULT.field,
        dir: sort[0] ? sort[0].dir : FIELD_DEFAULT.dir
    }
    const fieldMap = FIELD_COLUMN_MAP.find(cln => cln.field === configSort.field);
    const sortField = fieldMap ? fieldMap.map : configSort.field;
    return { ...configSort, field: sortField };
}

export const transformResourceFilter = (filter: any) => {
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