import { SortDescriptor } from "@progress/kendo-data-query";
import { IUser } from "../../users/models/user-model";
import { FIELD_COLUMN_MAP, FIELD_DEFAULT } from "../constant/config-default";
import { ICorrectiveAction, IDetermineCause, INCrecordedBy, INatureOfConference, IReviewOfCorrectiveAction } from "../models/config-model";
import { INoncoformanceData, IPurchaseNc } from "../models/nonconformance-model";
import { IJob } from "../../purchase-orders/models/purchase-model";

export const transformNonConformanceFilter = (filter: any) => {
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

export const transformNonConformanceSort = (sort: SortDescriptor[]) => {
    const configSort: any = {
        ...sort[0],
        field: sort[0] ? sort[0].field : FIELD_DEFAULT.field,
        dir: sort[0] ? sort[0].dir : FIELD_DEFAULT.dir
    }
    const fieldMap = FIELD_COLUMN_MAP.find(cln => cln.field === configSort.field);
    const sortField = fieldMap ? fieldMap.map : configSort.field;
    return { ...configSort, field: sortField };
}

export const transformUserOption = (users: IUser[]) => {
    return (users || []).map((user) => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`
    }))
}

export const transformDetermineCauseOption = (determineCause: IDetermineCause[]) => {
    return (determineCause || []).map((determineCause) => ({
        value: determineCause.code,
        label: `${determineCause.value}`
    }))
}

export const transformCorrectiveOption = (corrective: ICorrectiveAction[]) => {
    return (corrective || []).map((corrective) => ({
        value: corrective.code,
        label: `${corrective.value}`
    }))
}

export const transformNatureOption = (natureOfConference: INatureOfConference[]) => {
    return (natureOfConference || []).map((natureOfConference) => ({
        value: natureOfConference.code,
        label: `${natureOfConference.value}`
    }))
}

export const transformRecordedBy = (ncRecordedBy: INCrecordedBy[]) => {
    return (ncRecordedBy || []).map((ncRecordedBy) => ({
        value: ncRecordedBy.code,
        label: `${ncRecordedBy.value}`
    }))
}

export const transformPurchaseOption = (availpo: IPurchaseNc[]) => {
    return (availpo || []).map((po) => ({
        value: po.purchaseNumber,
        label: `${po.purchaseNumber}`
    }))
}

export const transformSaveNonconformance = (data: INoncoformanceData) => {
    return {
        ...data,
        correctiveNotes: (data.correctedAction === 'action' || data.correctedAction === 'changeProcedure')
         ? data.correctiveNotes :''
    }
}

export const transformJobOption = (jobs: IJob[]) => {
    return (jobs || []).map((job) => ({
        value: job.jobNumber,
        label: `${job.jobNumber}`
    }))
}

export const transformReviewCorrectiveOption = (reviewcorrective: IReviewOfCorrectiveAction[]) => {
    return (reviewcorrective || []).map((reviewcorrective) => ({
        value: reviewcorrective.code,
        label: `${reviewcorrective.value}`
    }))
}

export const transformAdminUserOption = (users: IUser[]) => {
    return (users || []).map((user) => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`
    }))
}
