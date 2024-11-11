import React, {useMemo, useState} from 'react'
import {useAsyncFn} from 'react-use'
import {IAlert} from '../../../shared/components/CustomAlert'
import { getAllClients } from '../api';
import { TOASTER_DEFAULT } from "../constant/quote-default";
import { QUOTE_FORM_DEFAULT } from "../constant/quote-default";

import { IQuote, ISelectedClientData } from "../models/quote-model";

interface IProps {
  selectedData: IQuote,
  setSelectedData: (data: IQuote) => void,
  contextToaster: IAlert,
  setContextToaster: (alert: IAlert) => void,
  clients: ISelectedClientData[],
  getAllClientsAsync: (...args: any[]) => Promise<void>,
  fetchingClient: boolean,

}

export const QuoteContext = React.createContext<IProps>({
  selectedData: QUOTE_FORM_DEFAULT,
  setSelectedData: (data: IQuote) => { },
  contextToaster: TOASTER_DEFAULT,
  setContextToaster: (data: IAlert) => { },
  clients: [],
  getAllClientsAsync: async (...args: any[]) => { },
  fetchingClient: false,

})

export const QuoteContextProvider: React.FC = ({children}) => {
  const [selectedData, setSelectedData] = useState<IQuote>(QUOTE_FORM_DEFAULT)
  const [contextToaster, setContextToaster] = useState<IAlert>(TOASTER_DEFAULT)
  const [clients, setClients] = useState<[]>([])
  const [{ loading: fetchingClient }, getAllClientsAsync] = useAsyncFn(async (...args) => {
    const [keyword] = args;
    const response = await getAllClients(keyword);
    const clients = response.data;
    setClients(clients as any);
  }, [setClients])
  

  const value: IProps = useMemo(() => {
    return {
      selectedData,
      setSelectedData,
      contextToaster,
      setContextToaster,
      clients,
      getAllClientsAsync,
      fetchingClient
    }
  }, [selectedData, setSelectedData, contextToaster, setContextToaster, clients, getAllClientsAsync, fetchingClient,
  ])

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
}
