import { SortDescriptor } from "@progress/kendo-data-query";
import { FIELD_COLUMN_MAP, FIELD_DEFAULT } from "../constant/config-defaults";
import { IMachine, IScheduleJob } from "../models/schedule-model";

export const transforMachineOption = (machines: IMachine[]): any => {
    let data: any = [];
    data = (machines || []).map((machine: any) => (
        {
            text: machine.description,
            id: machine.id
        }))
    return data;

}


export const transforStaffOption = (users: any): any => {
    let data: any = [];
    data = (users || []).map((add: any) => (
        {
            text: `${add.firstName} ${add.lastName}`,
            id: add.id
        }))
    return data;
}

export const transformFilter = (filter: any) => {
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

    return { ...filter, filters: newFilter };
}

export const transformJobSort = (sort: SortDescriptor[]) => {
    const configSort: any = {
        ...sort[0],
        field: sort[0] ? sort[0].field : FIELD_DEFAULT.field,
        dir: sort[0] ? sort[0].dir : FIELD_DEFAULT.dir
    }
    const fieldMap = FIELD_COLUMN_MAP.find(cln => cln.field === configSort.field);
    const sortField = fieldMap ? fieldMap.map : configSort.field;
    return { ...configSort, field: sortField };
}


export const transformAllocatedJob = (schedules: IScheduleJob[]) => {
    return (schedules || []).map((sched, idx) => (
        {
            ...sched,
            rowId: idx,
            operations: sched.operations
            // ,
            // operations: (sched.operations || []).map((operator, idx) => (
            // {  
            //     ...operator,
            //     rowId: idx 
            // }))
        }
    ))
}


export const transformAssignAllocatedJob = (schedules: IScheduleJob, assignee: number) => {
    return {
        ...schedules,
        operations: (schedules.operations || []).map((operator) => (
            {
                ...operator,
                staffId: assignee
            }))
        }
}
