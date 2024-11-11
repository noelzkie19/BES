import { SortDescriptor } from '@progress/kendo-data-query'
import axios from 'axios'
import { IJobData, IJobReportPrintFilter } from '../models/job-model'
import { number } from 'yup'

export const JOB_URL = `${process.env.REACT_APP_API_URL}/job`
export const CLIENT_URL = `${process.env.REACT_APP_API_URL}/client`
export const RESOURCE_URL = `${process.env.REACT_APP_API_URL}/resource`
export const USER_URL = `${process.env.REACT_APP_API_URL}/user`
export const STOCK_URL = `${process.env.REACT_APP_API_URL}/stock`

export const getJobs = async (
    skip: number,
    take: number,
    pageSort: SortDescriptor,
    tag: string,
    search?: any,
    advanceSearch?: string,
) => {
    let url = ''
    if (tag == 'Completed')
        url = 'getcompletejobpagination'
    else if (tag == 'Pending')
        url = 'getpendingjobpagination'
    else
        url = 'getjobswithpagination'
    
    return await axios.post(`${JOB_URL}/${url}`, {
        skip,
        take,
        sort: `${pageSort.field} ${pageSort.dir}`,
        search: advanceSearch,
        ...search
    })
}

export const createJob = async (form: any) => {
    const payload: IJobData = form
    const response = await axios.post(`${JOB_URL}`, payload)
    return response?.data ?? []
}
export const getAllClients = async () => {
    return await axios.get(`${CLIENT_URL}/getclientlist`)
}

export const getAllJobTypes = async () => {
    return await axios.get(`${JOB_URL}/getjobtypes`)
}

export const getAllResources = async () => {
    return await axios.get(`${RESOURCE_URL}`)
}
export const getAllUsers = async () => {
    return await axios.get(`${USER_URL}`)
}

export const getNcrs = async () => {
    return await axios.get(`${JOB_URL}/getncrs`)
}


export const updateJob = async (form: IJobData) => {
    const payload: IJobData = form
    await axios.put(`${JOB_URL}`, payload)
}

export const deleteJob = async (form: IJobData) => {
    return await axios.delete(`${JOB_URL}?id=${form.id}`)
}


export const getClientById = async (id: number) => {
    try {
        const data = await axios.get(`${CLIENT_URL}/getclientbyid?id=${id}`)
        return [data, null] 
    } catch(ex) {
        return [null, ex] 
    }
}
export const getJobByid = async (id: any) => {
    try {
        const data = await axios.get(`${JOB_URL}/getjobbyid?id=${id}`)
        return [data, null]
    } catch (ex) {
        return [null, ex]
    }
}


export const getJobOperationByJobid = async (id: number, jobidsource: string | null) => {
    try {
        const data = await axios.get(`${JOB_URL}/getjoboperationbyjobid?jobId=${id}&jobidsource=${jobidsource || 0}`)
        return [data, null]
    } catch (ex) {
        return [null, ex]
    }
}


export const getJobPurchaseOrder = async (jobId: any, parentJobNumber: any, jobidsource: string | null) => {
    try {
        const data = await axios.get(`${JOB_URL}/getjobpurchaseorder?jobId=${jobId}
        ${parentJobNumber ? `&parentJobNumber=${parentJobNumber}` : '' }
        ${jobidsource ? `&jobidsource=${jobidsource}` : '' }`)
        return [data, null]
    } catch (ex) {
        return [null, ex]
    }
}

export const getJobassembliesByjob = async (jobId: any) => {
    try {
        const data = await axios.get(`${JOB_URL}/getjobassembliesbyjob?jobId=${jobId}`)
        return [data, null]
    } catch (ex) {
        return [null, ex]
    }
}


export const createJobSubAssembly = async (jobId: number) => {
    try {
        const data = await axios.post(`${JOB_URL}/createjobsubassembly`, {
            jobId
        })
        return [data, null] 
    } catch (ex) {
        return [null, ex]
    }
}

export const getJobReportPrint = async (form: IJobReportPrintFilter) => {
    var { client,  sortBy, isAllClient, by, jobType, isAllJobType, skip, take, toBeInvoice } = form;
    let querySortBy = `${by} ${sortBy}`
    try {
        const result = await axios.post(`${JOB_URL}/getjobreportprint`, {
            sortBy: querySortBy,
            client: isAllClient ? 0 : client,
            // dateFrom: from,
            // dateTo: to,
            jobType: isAllJobType ? 0 : jobType,
            skip,
            take,
            toBeInvoice

        })
    
        return [result, null]
    } catch (ex) {
        return [null, ex]
    }

}


export const sendJobConfirmPrint = (file: any, sendTo: any, userName: any, jobId: any, id: any,
    clientId: any) => {
    return new Promise((resolve, reject) => {
        var form = new FormData();
        form.append('sendTo', sendTo);
        form.append('userName', userName);
        form.append('Attachment', file);
        form.append('jobId', jobId);
        form.append('id', id);
        form.append('clientId', clientId);
        
        axios.post(`${JOB_URL}/sendconfirmjobpdf`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(resolve).catch(reject);
    });
}


export const getJobDeliveriesByJobId = async (id: number) => {
    return await axios.get(`${JOB_URL}/getjobdeliveriesbyjobid?jobId=${id}`)
}

export const getLastJobNumber = async (keyword?: any) => {
    return await axios.get(`${JOB_URL}/getlastjobnumber`)
}

export const updateDuplicateprint = async (id: number) => {
    try {
        const data = await axios.post(`${JOB_URL}/updateduplicateprint`, {
            id
        })
        return [data, null] 
    } catch (ex) {
        return [null, ex]
    }
}

export const getStockByDrawingRev = async (drawing: string, revision: string, jobId?: number) => {
    return await axios.get(`${STOCK_URL}/getstockbydrawingrev`, {
        params: {
            drawing,
            revision,
            jobId
        }
    })
}

