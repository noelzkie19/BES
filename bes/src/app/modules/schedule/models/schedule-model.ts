
export interface IUnAllocatedJob {
  jobId: string
  description: string
  client: string
  assignee: string
  mainJobId: number
}

export interface IScheduleJob extends IUnAllocatedJob {
  id?: number,
  operator: number
  machine: string
  staff: string
  notes: string
  dueDate: Date | null
  isUrgent: boolean,
  expanded: boolean
  inEdit: string
  operations: IOperations[]
  rowId: number
}



export interface IOperations {
  id: number
  description: string
  machineId: number
  staffId: number
}

export interface IMachine {
  id: number
  description: string
}