import React, {useMemo, useState} from 'react'
import {IAlert} from '../../../shared/components/CustomAlert'
import { NON_CONFORMANCEFORM_DEFAULT, TOASTER_DEFAULT } from '../constant/nonconformance-default'
import { INonConformance, IPurchaseNc } from '../models/nonconformance-model'
import { useAsyncFn } from 'react-use'
import { getAllJobs, getAvailablePo } from '../api'
import { IJob } from '../../purchase-orders/models/purchase-model'
import { getJobs } from '../../jobs/api'
import { IUser } from '../../users/models/user-model'
import { getAdminUsers } from '../../users/api'

interface IProps {
  selectedData: INonConformance,
  setSelectedData: (data: INonConformance) => void,
  contextToaster: IAlert | undefined,
  setContextToaster: (alert: IAlert | undefined) => void
  purchases: IPurchaseNc[],
  getAllAvailablePOAsync: (...args: any[]) => Promise<void>,
  fetchingPo: boolean,
  jobs: IJob[],
  getJobsAsync: (...args: any[]) => Promise<void>
  fetchingJobs: boolean,
  adminUsers: IUser[],
  getAdminUsersAsync: (...args: any[]) => Promise<void>,
  fetchingAdminUsers: boolean
}



export const NonConformanceContext = React.createContext<IProps>({
  selectedData: NON_CONFORMANCEFORM_DEFAULT,
  setSelectedData: (data: INonConformance) => { },
  contextToaster: TOASTER_DEFAULT,
  setContextToaster: (data: IAlert | undefined) => { },
  purchases: [],
  getAllAvailablePOAsync: async (...args: any[]) => { },
  fetchingPo: false,
  jobs: [],
  getJobsAsync: async (...args: any[]) => { },
  fetchingJobs: false,
  adminUsers: [],
  getAdminUsersAsync: async (...args: any[]) => { },
  fetchingAdminUsers: false
})


export const NonConformanceContextProvider: React.FC = ({ children }) => {
  const [selectedData, setSelectedData] = useState<INonConformance>(NON_CONFORMANCEFORM_DEFAULT)
  const [contextToaster, setContextToaster] = useState<IAlert | undefined>()
  const [purchases, setPurchases] = useState<IPurchaseNc[]>([])
  const [jobs, setJobs] = useState<IJob[]>([])
  const [adminUsers, setUsers] = useState<IUser[]>([])
  
   const [{ loading: fetchingPo }, getAllAvailablePOAsync] = useAsyncFn(async (...args) => {
    const [keyword] = args;
    const response = await getAvailablePo(keyword);
    setPurchases(response.data as any);
  }, [setPurchases])

  const [{ loading: fetchingJobs }, getJobsAsync] = useAsyncFn(async (...args) => {
    const [keyword] = args;
    const [data]: any = await getAllJobs();
    console.log(data)
    setJobs(data.data as any);
  }, [setJobs])

  
  const [{ loading: fetchingAdminUsers }, getAdminUsersAsync] = useAsyncFn(async (...args) => {
    const [data]: any = await getAdminUsers();
    console.log(data)
    setUsers(data.data as any);
  }, [setUsers])
  
  const value: IProps = useMemo(() => { 
    return {
          selectedData,
          setSelectedData,
          contextToaster,
          setContextToaster,
          purchases,
          getAllAvailablePOAsync,
          fetchingPo,
          jobs, 
          getJobsAsync, 
          fetchingJobs,
          adminUsers,
          getAdminUsersAsync,
          fetchingAdminUsers
    } 
  }, [contextToaster, setContextToaster, selectedData, setSelectedData, purchases,
    getAllAvailablePOAsync, fetchingPo, jobs, getJobsAsync, fetchingJobs, adminUsers, getAdminUsersAsync,fetchingAdminUsers]);
  return (
      <NonConformanceContext.Provider value={value}>{children}</NonConformanceContext.Provider>
    )
}
  