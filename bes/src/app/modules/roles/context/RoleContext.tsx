import React, { useMemo, useState } from "react";
import { IAlert } from "../../../shared/components/CustomAlert";
import { ROLE_FORM_DEFAULT, TOASTER_DEFAULT } from "../constant/role-default";
import { IRole } from "../models/role-model";


interface IProps {
    selectedData: IRole,
    setSelectedData: (data: IRole) => void,
    contextToaster: IAlert,
    setContextToaster: (alert: IAlert) => void,
}

export const RoleContext = React.createContext<IProps>({
    selectedData: ROLE_FORM_DEFAULT,
    setSelectedData: (data: IRole) => { },
    contextToaster: TOASTER_DEFAULT,
    setContextToaster: (data: IAlert) => { }, 
})


export const RoleContextProvider: React.FC = ({ children }) => {
    const [selectedData, setSelectedData] = useState<IRole>(ROLE_FORM_DEFAULT)
    const [contextToaster, setContextToaster] = useState<IAlert>(TOASTER_DEFAULT)
  
    const value: IProps = useMemo(() => {
          return {
            selectedData,
            setSelectedData,
            contextToaster,
            setContextToaster
          }
    }, [selectedData, setSelectedData, contextToaster, setContextToaster])
      
    return (
        <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
      )
  }
  