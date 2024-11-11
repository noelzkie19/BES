import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {useEffectOnce} from 'react-use'
import {CustomAlert, IAlert} from '../../../shared/components/CustomAlert'
import {useHistory} from 'react-router-dom'
import {getStock} from '../api'

import {IStockReport} from '../models/stock-model'
import {IStocks} from '../models/stock-model'
import {StockContext} from '../context/StockContext'
import {DeleteStockModal} from './DeleteStockModal'
import {process, SortDescriptor, State} from '@progress/kendo-data-query'
import {PrintModal} from '../modal/PrintModal'
import {useReactToPrint} from 'react-to-print'
import {StockPrintContent} from '../print/StockPrintContent'
import { ActionEnum } from '../../../../_metronic/partials/widgets/grid/constant/ActionOption'
import { SearchWidget1 } from '../../../../_metronic/partials/widgets/search/SearchWidget1'
import { StockGrid } from './StockGrid'


const StockList: React.FC = () => {
  const history = useHistory()

  const {contextToaster, setSelectedData} = useContext(StockContext)
  const [toast, setToast] = useState<IAlert | undefined>()
  const [deleteData, setDeleteData] = useState<IStocks | undefined>()
  const [modalShow, setModalShow] = useState(false)
  const [modalPrint, setModalPrint] = useState(false)
  const componentRefDetails = useRef<any>()
  const [printStocks, setPrintStocks] = useState<IStockReport[]>([])
  const advanceSearch = useRef('');
  const [requestReload, setRequestReload] = useState<boolean>(false)
  

  const printHandler = useReactToPrint({
    content: () => componentRefDetails.current,
  })

  useEffect(() => {
    if (contextToaster.message != null && contextToaster.message !== '') {
      setToast(contextToaster)
      setTimeout(() => setToast(undefined), 3000)
    }
  }, [contextToaster])

  const closeModal = () => {
    setModalShow(false)
  }
  const deleteHandler = () => {
    setModalShow(false)
    setRequestReload(true)
  }

  const actionHandler = (event: any, dataItem: any, dataIndex: number) => {
    switch(event.value.value) {
      case ActionEnum.Edit: 
        setSelectedData(dataItem)
        history.push({
          pathname: '/stock/edit',
          search: `?id=${dataItem.id}`,
        })
        break;
      case ActionEnum.Delete: 
        setModalShow(true)
        setDeleteData(dataItem)
        break;
    }
  }

  const searchHandler = (result: string) => {
    advanceSearch.current = result;
    setRequestReload(true)
  }

  return (
    <React.Fragment>
      <div className='card card-custom'>
        <div className='card-body'>
          {modalPrint && (
            <React.Fragment>
              <PrintModal
                title={'Stock Report'}
                toggleDialog={() => setModalPrint(false)}
                onPrint={(data) => {
                  setPrintStocks(data)
                  printHandler()
                }}
              ></PrintModal>
              <div style={{display: 'none'}}>
                <StockPrintContent
                  refs={componentRefDetails}
                  dataItem={printStocks}
                ></StockPrintContent>
              </div>
            </React.Fragment>
          )}
          <DeleteStockModal
            show={modalShow}
            handleClose={closeModal}
            stockData={deleteData}
            deleteCallback={deleteHandler}
          />
          <div className='row justify-content-between align-items-center'>
            <div className='d-flex actions'>
              <button
                className='btn btn-primary col-auto me-auto'
                onClick={() => {
                  history.push('/stock/new')
                }}
              >
                <i className='bi bi-plus-lg'></i> New Stock
              </button>
              <button
                type='submit'
                onClick={() => setModalPrint(true)}
                className='btn btn-primary col-auto'
              >
                Print Stock Report
              </button>
            </div>
          </div>
          <div className='App'>
            <SearchWidget1 search={searchHandler} shouldClearSearch ={false}></SearchWidget1>
            <StockGrid actionHandler={actionHandler} 
              advanceSearch={advanceSearch.current}
              requestReload={requestReload}
              handleDoneReload={() => {setRequestReload(false)}}></StockGrid>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export {StockList}
