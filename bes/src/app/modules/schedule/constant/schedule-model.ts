import { IScheduleJob } from "../models/schedule-model";

export const INITIALSCHED_DEFAULT: IScheduleJob = {
    jobId: '',
    description: '',
    client: '',
    assignee: '',
    operator: 0,
    machine: '',
    staff: '',
    notes: '',
    dueDate: null,
    isUrgent: false,
    mainJobId: 0,
    expanded: false,
    inEdit: '',
    rowId: 0,
    operations: []
}
