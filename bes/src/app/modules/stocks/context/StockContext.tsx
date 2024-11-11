import React, {useMemo, useState} from 'react'
import {useAsyncFn} from 'react-use'
import {IAlert} from '../../../shared/components/CustomAlert'
import { TOASTER_DEFAULT } from "../constant/stock-default";
import { STOCK_FORM_DEFAULT } from "../constant/stock-default";

import { IStocks } from "../models/stock-model";

interface IProps {
  selectedData: IStocks,
  setSelectedData: (data: IStocks) => void,
  contextToaster: IAlert,
  setContextToaster: (alert: IAlert) => void,
}

export const StockContext = React.createContext<IProps>({
  selectedData: STOCK_FORM_DEFAULT,
  setSelectedData: (data: IStocks) => { },
  contextToaster: TOASTER_DEFAULT,
  setContextToaster: (data: IAlert) => { },
})

export const StockContextProvider: React.FC = ({children}) => {
  const [selectedData, setSelectedData] = useState<IStocks>(STOCK_FORM_DEFAULT)
  const [contextToaster, setContextToaster] = useState<IAlert>(TOASTER_DEFAULT)

  const value: IProps = useMemo(() => {
    return {
      selectedData,
      setSelectedData,
      contextToaster,
      setContextToaster
    }
}, [ selectedData, setSelectedData, contextToaster, setContextToaster])

  return <StockContext.Provider value={value}>{children}</StockContext.Provider>
}
