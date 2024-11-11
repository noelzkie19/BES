import React, { useMemo, useState } from 'react'
import {IAlert} from '../../../shared/components/CustomAlert'
import {TOASTER_DEFAULT, RESOURCE_FORM_DEFAULT} from '../constant/resource-default'
import {Resource} from '../models/resource-model'

interface IProps {
  selectedData: Resource
  setSelectedData: (data: Resource) => void
  contextToaster: IAlert
  setContextToaster: (alert: IAlert) => void
}

export const ResourceContext = React.createContext<IProps>({
  selectedData: RESOURCE_FORM_DEFAULT,
  setSelectedData: (data: Resource) => {},
  contextToaster: TOASTER_DEFAULT,
  setContextToaster: (data: IAlert) => {},
})

export const ResourceContextProvider: React.FC = ({children}) => {
  const [selectedData, setSelectedData] = useState<Resource>(RESOURCE_FORM_DEFAULT)
  const [contextToaster, setContextToaster] = useState<IAlert>(TOASTER_DEFAULT)

  const value: IProps = useMemo(() => {
    return {
      selectedData,
      setSelectedData,
      contextToaster,
      setContextToaster
    }
}, [ selectedData, setSelectedData, contextToaster, setContextToaster])


  return <ResourceContext.Provider value={value}>{children}</ResourceContext.Provider>
}
