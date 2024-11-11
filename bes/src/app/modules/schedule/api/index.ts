import axios from "axios"

import { SortDescriptor } from "@progress/kendo-data-query"
import { IScheduleJob } from "../models/schedule-model"
export const SCHEDULE_URL = `${process.env.REACT_APP_API_URL}/schedule`
export const USER_URL = `${process.env.REACT_APP_API_URL}/user`
export const MACHINE_URL = `${process.env.REACT_APP_API_URL}/machine`

export const getScheduleUnAllocatedJob = async (
    skip: number,
    take: number,
    pageSort: SortDescriptor,
    search: any
) => {
    try {
        const response = await axios.post(`${SCHEDULE_URL}/getscheduleunallocatedjob`, {
            skip,
            take,
            sortBy: `${pageSort.field} ${pageSort.dir}`,
            ...search
        })
        return response?.data ?? []
    } catch (err) {
        return []
    }
}


export const getScheduleAllocatedJob = async (
    skip: number,
    take: number,
    pageSort: SortDescriptor,
    search: any
) => {
    try {
        const response = await axios.post(`${SCHEDULE_URL}/getscheduleallocatedjob`, {
            skip,
            take,
            sortBy: `${pageSort.field} ${pageSort.dir}`,
            ...search
        })
        return response?.data ?? []
    } catch (err) {
        return []
    }
}

export const allocateSchedule = async (form: IScheduleJob, assignee: number) => {
    const payload: IScheduleJob = form
    return await axios.post(`${SCHEDULE_URL}/allocateschedule`, {
        ...payload,
        assignee
    })
}

export const unAllocateSchedule = async (form: IScheduleJob) => {
    const payload: IScheduleJob = form
    await axios.post(`${SCHEDULE_URL}/unallocateschedule`, payload)
}

export const getScheduleStaff = async (staffId: number,
    skip: number,
    take: number,
    pageSort: SortDescriptor,
    search: any) => {
    return await axios.post(`${SCHEDULE_URL}/getschedulestaff`, {
        staffId,
        skip,
        take,
        SortBy: `${pageSort.field} ${pageSort.dir}`,
        ...search,
    })
}


export const getAllUsers = async (keyword: any) => {
    return await axios.get(`${USER_URL}`)
}


export const getAllMachines = async (keyword: any) => {
    return await axios.get(`${MACHINE_URL}`)
}

export const updateJobSchedule = async (form: any) => {
    return await axios.patch(`${SCHEDULE_URL}/updatejobschedule`, {
        operationId: form.id,
        machineId: form.machineId,
        staffId: form.staffId
    })
}
export const updateScheduleNotes = async (form: any) => {
    return await axios.patch(`${SCHEDULE_URL}/updateschedulenotes`, {
        scheduleId: form.id,
        notes: form.notes,
        isUrgent: form.isUrgent
    })
}

