import React, {useMemo, useState} from 'react'
import {useAsyncFn} from 'react-use'
import {IAlert} from '../../../shared/components/CustomAlert'
import { getJobByid } from '../../jobs/api'
import { JOB_FORM_DEFAULT } from '../../jobs/constant/job-default'
import { IJobData } from '../../jobs/models/job-model'
import { IUser } from '../../users/models/user-model'
import { getAllMachines, getAllUsers } from '../api'
import { IMachine } from '../models/schedule-model'

interface IProps {
  users: IUser[],
  getAllUsersAsync: (...args: any[]) => Promise<void>,
  fetchingUsers: boolean,
  machines: IMachine[],
  getAllMachinesAsync: (...args: any[]) => Promise<void>,
  fetchingMachines: boolean,
  selectedJobData: IJobData,
  getJobByidAsync: (jobid: any) => Promise<void>,
  fetchingJobData: boolean
}



export const ScheduleContext = React.createContext<IProps>({
  users: [],
  getAllUsersAsync: async (...args: any[]) => { },
  fetchingUsers: false,
  machines: [],
  getAllMachinesAsync: async (...args: any[]) => { },
  fetchingMachines: false,
  selectedJobData: JOB_FORM_DEFAULT,
  getJobByidAsync: async (jobid: any) => { },
  fetchingJobData: false
})


export const ScheduleContextProvider: React.FC = ({children}) => {
  const [users, setUsers] = useState<[]>([])
  const [machines, setMachines] = useState<[]>([])
  const [selectedJobData, setSelectedJobData] = useState<IJobData>(JOB_FORM_DEFAULT)
  

  const [{ loading: fetchingUsers }, getAllUsersAsync] = useAsyncFn(async (...args) => {
    const [keyword] = args;
    const response = await getAllUsers(keyword);
    setUsers(response.data as any);
  }, [setUsers])

  const [{ loading: fetchingMachines }, getAllMachinesAsync] = useAsyncFn(async (...args) => {
    const [keyword] = args;
    const response = await getAllMachines(keyword);
    setMachines(response.data as any);
  }, [setUsers])

  const [{ loading: fetchingJobData }, getJobByidAsync] = useAsyncFn(async (jobid: any) => {
    const [data]: any = await getJobByid(jobid)
    setSelectedJobData(data.data as any);
  }, [setUsers])


  const value: IProps = useMemo(() => {
    return {
      users,
      getAllUsersAsync,
      fetchingUsers,
      machines,
      getAllMachinesAsync,
      fetchingMachines,
      selectedJobData,
      getJobByidAsync,
      fetchingJobData
    }
  }, [users, getAllUsersAsync, fetchingUsers, machines, getAllMachinesAsync, fetchingMachines,
    selectedJobData, getJobByidAsync, fetchingJobData])



  return <ScheduleContext.Provider value={value}>{children}</ScheduleContext.Provider>
}
