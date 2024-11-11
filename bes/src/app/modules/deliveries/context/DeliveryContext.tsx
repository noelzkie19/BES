import React, {useMemo, useState} from 'react'
import {useAsyncFn} from 'react-use'
import { ISelectedClientData } from '../../quote/models/quote-model'
import { getAllClients } from '../../jobs/api'

interface IProps {
  clients: ISelectedClientData[],
  getAllClientsAsync: (...args: any[]) => Promise<void>,
  fetchingClient: boolean,
}

export const DeliveryContext = React.createContext<IProps>({
  clients: [],
  getAllClientsAsync: async () => { },
  fetchingClient: false,
})

export const DeliveryContextProvider: React.FC = ({children}) => {
  const [clients , setClients] = useState<[]>([])

  const [{ loading: fetchingClient }, getAllClientsAsync] = useAsyncFn(async () => {
    const response = await getAllClients();
    const clients = response.data;
    setClients(clients as any);
    return response.data;
  }, [setClients])

  const value: IProps = useMemo(() => { 
    return {
          getAllClientsAsync,
          fetchingClient,
          clients
    } 
  }, [getAllClientsAsync, fetchingClient, clients]);


  return <DeliveryContext.Provider value={value}>{children}</DeliveryContext.Provider>
}
