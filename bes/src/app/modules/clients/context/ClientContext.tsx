import React, { useMemo, useState } from "react"
import { useEffectOnce } from "react-use";
import { usePageData } from "../../../../_metronic/layout/core";
import { IAlert } from "../../../shared/components/CustomAlert";
import { dataProvider } from "../../../shared/data/data-provider";
import { userCanEdit } from "../../../shared/service/utils";
import { CLIENT_FORM_DEFAULT } from "../constant/client-defaults";
import { TOASTER_DEFAULT } from "../constant/config-defaults";
import { IAccount, IClientData } from "../models/client-model";
import { IAddressType, IStates } from "../models/config-model";

interface IProps {
  selectedData: IClientData,
  setSelectedData: (data: IClientData) => void,
  contextToaster: IAlert | undefined,
  setContextToaster: (alert: IAlert | undefined) => void,
  optionStates: IStates[],
  optionAddressType: IAddressType[],
  isCanEdit: boolean,
  setIsCanEdit: (isCanEdit: boolean) => void,
}

export const ClientContext = React.createContext<IProps>({
  selectedData: CLIENT_FORM_DEFAULT,
  setSelectedData: (data: IClientData) => { },
  contextToaster: TOASTER_DEFAULT,
  setContextToaster: (data: IAlert | undefined) => { },
  optionStates: [],
  optionAddressType: [],
  isCanEdit: false,
  setIsCanEdit: (isCanEdit: boolean) => {},
})


export const ClientContextProvider: React.FC = ({ children }) => {
  const [accounts, setAccounts] = useState<IAccount[]>([])
  const [selectedData, setSelectedData] = useState<IClientData>(CLIENT_FORM_DEFAULT)
  const [contextToaster, setContextToaster] = useState<IAlert | undefined>()
  const [optionStates, setOptionStates] = useState<IStates[]>([])
  const [optionAddressType, setOptionAddressType] = useState<IAddressType[]>([])
  const [isCanEdit, setIsCanEdit] = useState<boolean>(false)

  useEffectOnce(() => {
    setOptionStates(dataProvider.states);
    setOptionAddressType(dataProvider.addressType);
  });


  const value: IProps = useMemo(() => {
        return {
          accounts,
          setAccounts,
          selectedData,
          setSelectedData,
          contextToaster,
          setContextToaster,
          optionStates,
          optionAddressType, 
          isCanEdit,
          setIsCanEdit
        }
  }, [accounts, setAccounts, selectedData, setSelectedData,
    contextToaster, setContextToaster, optionStates, optionAddressType, isCanEdit,
    setIsCanEdit])
    
  return (
      <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
    )
}



