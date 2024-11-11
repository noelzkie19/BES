import React, { useMemo, useState } from "react"
import { useAsyncFn, useEffectOnce } from "react-use";
import { IAlert } from "../../../shared/components/CustomAlert";
import { dataProvider } from "../../../shared/data/data-provider";
import { getUserApproval } from "../api";
import { TOASTER_DEFAULT } from "../constant/config-defaults";
import { SUPPLIER_FORM_DEFAULT } from "../constant/supplier-defaults";
import { IAddressType, IStates } from "../models/config-model";
import { ISupplierData, IUser } from "../models/supplier-model";

interface IProps {
  selectedData: ISupplierData,
  setSelectedData: (data: ISupplierData) => void,
  contextToaster: IAlert | undefined,
  setContextToaster: (alert: IAlert | undefined) => void,
  optionStates: IStates[],
  optionAddressType: IAddressType[],
  userApproval: IUser[]
  getUserApprovalAsync: (...args: any[]) => Promise<void>
  fetchingUserApproval: boolean,
  isCanEdit: boolean,
  setIsCanEdit: (isCanEdit: boolean) => void,

}

export const SupplierContext = React.createContext<IProps>({
  selectedData: SUPPLIER_FORM_DEFAULT,
  setSelectedData: (data: ISupplierData) => { },
  contextToaster: TOASTER_DEFAULT,
  setContextToaster: (data: IAlert | undefined) => { },
  optionStates: [],
  optionAddressType: [],
  userApproval: [],
  getUserApprovalAsync: async (...args: any[]) => { },
  fetchingUserApproval: false,
  isCanEdit: false,
  setIsCanEdit: (isCanEdit: boolean) => {},
})


export const SupplierContextProvider: React.FC = ({ children }) => {
  const [selectedData, setSelectedData] = useState<ISupplierData>(SUPPLIER_FORM_DEFAULT)
  const [contextToaster, setContextToaster] = useState<IAlert | undefined>()
  const [optionStates, setOptionStates] = useState<IStates[]>([])
  const [optionAddressType, setOptionAddressType] = useState<IAddressType[]>([])
  const [userApproval, setUserApproval] = useState<IUser[]>([]);
  const [isCanEdit, setIsCanEdit] = useState<boolean>(true)

  useEffectOnce(() => {
    setOptionStates(dataProvider.states);
    setOptionAddressType(dataProvider.addressType);
  });

  const [{ loading: fetchingUserApproval }, getUserApprovalAsync] = useAsyncFn(async (...args) => {
    const [keyword] = args;
    const response = await getUserApproval(keyword);
    setUserApproval(response.data as any);
  }, [setUserApproval])


  const value: IProps = useMemo(() => {
    return {
      selectedData,
      setSelectedData,
      contextToaster,
      setContextToaster,
      optionStates,
      optionAddressType,
      userApproval,
      getUserApprovalAsync,
      fetchingUserApproval,
      isCanEdit,
      setIsCanEdit
    }
  }, [selectedData, setSelectedData, contextToaster, setContextToaster, optionStates, optionAddressType, userApproval, getUserApprovalAsync, 
      fetchingUserApproval, isCanEdit, setIsCanEdit])

  return (
    <SupplierContext.Provider value={value}>{children}</SupplierContext.Provider>
  )
}



