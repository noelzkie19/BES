import React, { useMemo, useState } from "react";
import { useAsyncFn } from "react-use";
import { IAlert } from "../../../shared/components/CustomAlert";
import { getAllRoles } from "../api";
import { TOASTER_DEFAULT, USER_FORM_DEFAULT } from "../constant/user-default";
import { IOption, IUserData } from "../models/user-model";
import { transformDataRoles } from "../transformers/user-transformer";


interface IProps {
    selectedData: IUserData,
    setSelectedData: (data: IUserData) => void,
    contextToaster: IAlert,
    setContextToaster: (alert: IAlert) => void,
    roleOptions: IOption[],
    getAllRolesAsync: (...args: any[]) => Promise<void>,
    fetchingRole: boolean,
}

export const UserContext = React.createContext<IProps>({
    selectedData: USER_FORM_DEFAULT,
    setSelectedData: (data: IUserData) => { },
    contextToaster: TOASTER_DEFAULT,
    setContextToaster: (data: IAlert) => { },
    roleOptions: [],
    getAllRolesAsync: async (...args: any[]) => { },
    fetchingRole: false,
})


export const UserContextProvider: React.FC = ({ children }) => {
    const [selectedData, setSelectedData] = useState<IUserData>(USER_FORM_DEFAULT)
    const [contextToaster, setContextToaster] = useState<IAlert>(TOASTER_DEFAULT)
    const [roleOptions , setRoleOptions] = useState<IOption[]>([])

    const [{ loading: fetchingRole }, getAllRolesAsync] = useAsyncFn(async (...args) => {
        const [keyword] = args;
        const response = await getAllRoles(keyword);
        const roles = transformDataRoles(response.data);
        setRoleOptions(roles as any);
      }, [setRoleOptions])
  
    const value: IProps = useMemo(() => {
          return {
            selectedData,
            setSelectedData,
            contextToaster,
            setContextToaster,
            roleOptions,
            getAllRolesAsync,
            fetchingRole
          }
    }, [selectedData, setSelectedData, contextToaster, setContextToaster, roleOptions , getAllRolesAsync , fetchingRole])
      
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
      )
  }
  