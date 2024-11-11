import React, {useEffect, useMemo, useState} from 'react'
import { useAsyncFn, useEffectOnce } from 'react-use'
import { usePageData } from '../../../../_metronic/layout/core'

import {IAlert} from '../../../shared/components/CustomAlert'
import { userCanEdit } from '../../../shared/service/utils'
import { ISupplier, ISupplierData } from '../../suppliers/models/supplier-model'
import { getJobs, getSuppliers } from '../api'
import { TOASTER_DEFAULT } from '../constant/config-default'
import { PURCHASE_FORM_DEFAULT } from '../constant/purchase-defaults'
import { IJob, IPurchaseData } from '../models/purchase-model'

interface IProps {
  selectedData: IPurchaseData,
  setSelectedData: (data: IPurchaseData) => void,
  setContextToaster: (alert: IAlert | undefined) => void,
  contextToaster: IAlert | undefined,
  suppliers: ISupplierData[],
  getSupplierAsync: (...args: any[]) => Promise<void>
  fetchingSupplier: boolean,
  jobs: IJob[],
  getJobsAsync: (...args: any[]) => Promise<void>
  fetchingJobs: boolean,
  isCanEdit: boolean
}

export const PurchaseOrderContext = React.createContext<IProps>({
  selectedData: PURCHASE_FORM_DEFAULT,
  setSelectedData: (data: IPurchaseData) => { },
  setContextToaster: (data: IAlert | undefined) => { },
  contextToaster: TOASTER_DEFAULT,
  suppliers: [],
  getSupplierAsync: async (...args: any[]) => { },
  fetchingSupplier: false,
  jobs: [],
  getJobsAsync: async (...args: any[]) => { },
  fetchingJobs: false,
  isCanEdit: false
})

export const PurchaseOrderContextProvider: React.FC = ({children}) => {
  const { currentUser } = usePageData()
  const [selectedData, setSelectedData] = useState<IPurchaseData>(PURCHASE_FORM_DEFAULT)
  const [contextToaster, setContextToaster] = useState<IAlert | undefined>()
  const [suppliers, setSuppliers] = useState<ISupplierData[]>([])
  const [jobs, setJobs] = useState<IJob[]>([])
  const [isCanEdit, setIsCanEdit] = useState<boolean>(false)

  const [{ loading: fetchingSupplier }, getSupplierAsync] = useAsyncFn(async (...args) => {
    const [keyword] = args;
    const response = await getSuppliers(keyword);
    setSuppliers(response.data as any);
  }, [setSuppliers])

  const [{ loading: fetchingJobs }, getJobsAsync] = useAsyncFn(async (...args) => {
    const [keyword] = args;
    const [data]: any = await getJobs(keyword);
    setJobs(data.data as any);
  }, [setJobs])

  useEffectOnce(() => {
    setIsCanEdit(userCanEdit(currentUser.userRoles))
  })

  const value: IProps = useMemo(() => {
     return {
       selectedData,
       setSelectedData,
       contextToaster,
       setContextToaster,
       suppliers,
       getSupplierAsync,
       fetchingSupplier,
       jobs, 
       getJobsAsync, 
       fetchingJobs,
       isCanEdit
     }
  }, [selectedData, setSelectedData, contextToaster, setContextToaster, suppliers,
    getSupplierAsync, fetchingSupplier, jobs, getJobsAsync, fetchingJobs, isCanEdit])

  return <PurchaseOrderContext.Provider value={value}>{children}</PurchaseOrderContext.Provider>
}
