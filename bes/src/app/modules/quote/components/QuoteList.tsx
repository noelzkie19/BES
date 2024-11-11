import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useEffectOnce } from 'react-use'
import { CustomAlert, IAlert } from '../../../shared/components/CustomAlert'
import { useHistory } from 'react-router-dom'
import { getQuotes, getQuoteWithVersion, sendEmailQuotePdf, updatePrintDate } from '../api'
import { GridSetup, IQuote, IQuoteSearch } from '../models/quote-model'
import { Initial_GridSetup, QUOTE_FORM_DEFAULT } from '../constant/quote-default'
import { useReactToPrint } from 'react-to-print'
import { QuoteContext } from '../context/QuoteContext'
import { SortDescriptor } from '@progress/kendo-data-query'
import QuoteReportPrintDetails from './print/QuoteReportPrintDetails'
import { PrintQuoteModal } from './modal/PrintQuoteModal'
import jsPDF from 'jspdf'
import { SendQuotePdfModal } from './modal/SendQuotePdfModal'
import { ConverQuoteToJobModal } from './modal/ConvertToJobModal'
import { DeleteQuoteModal } from './modal/DeleteQuoteModal'
import { usePageData } from '../../../../_metronic/layout/core'
import { ActionEnum } from '../../../../_metronic/partials/widgets/grid/constant/ActionOption'
import { SearchWidget1 } from '../../../../_metronic/partials/widgets/search/SearchWidget1'
import { QouteGrid } from './partial/QouteGrid'

interface PageState {
  skip: number
  take: number
}

const loadingPanel = (
  <div className='k-loading-mask'>
    <span className='k-loading-text'>Loading</span>
    <div className='k-loading-image'></div>
    <div className='k-loading-color'></div>
  </div>
)

const filterOperators = {
  text: [
    {
      text: 'grid.filterContainsOperator',
      operator: 'contains',
    },
  ],
  boolean: [
    {
      text: 'grid.filterEqOperator',
      operator: 'eq',
    },
  ],
}

const QuoteList: React.FC = () => {
  const { setSelectedData, contextToaster } = useContext(QuoteContext)
  const [deleteData, setDeleteData] = useState<IQuote | undefined>()
  const [printData, setPrintData] = useState<any | undefined>()
  const [selectedQuoteData, setSelectedQuoteData] = useState<any | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<IAlert | undefined>()
  const [modalShow, setModalShow] = useState(false)
  const [modalSendQuotePdfShow, setSendQuotePdfShow] = useState(false)
  const componentRefDetails = useRef<any>()
  const [isSending, setIsSending] = useState<boolean>(false)
  const history = useHistory()
  const [toaster, setToaster] = useState<IAlert | undefined>()
  const [requestRefresh, setRequestRefresh] = useState<boolean>(false)
  const {currentUser} = usePageData()
  const advanceSearch = useRef('');

  
  useEffect(() => {
    if (contextToaster?.message != null && contextToaster?.message !== '') {
      setToast(contextToaster)
      setTimeout(() => setToast(undefined), 1000)
    }
  }, [contextToaster])

  const closeModal = () => {
    setModalShow(false)
  }
  
  const closeSendQuotePdfShow = () => {
    setSendQuotePdfShow(false)
  }
 
  const deleteHandler = () => {
    setModalShow(false)
    setRequestRefresh(true)
  }

  const sendQuotePdfHandler = () => {
    setSendQuotePdfShow(false);
    // fetchData()
    setRequestRefresh(true)
  }


  const types: string[] = ['On Going', 'For Client Confirmation', 'Completed']

  const actionHandler = (event: any, dataItem: any, dataIndex: number) => {
    switch(event.value.value) {
      case ActionEnum.Edit: 
        setSelectedData(dataItem)
        history.push({
          pathname: '/quote/edit',
          search: `?id=${dataItem.id}`,
        })
        break;
      case ActionEnum.Delete: 
        setDeleteData(dataItem)
        setModalShow(true)
        break;
     
      case ActionEnum.EmailQuote: 
        setPrintData(dataItem)
        setSelectedQuoteData(dataItem)
        setSendQuotePdfShow(true);
        break;
   
    }
  }

  const closeToasterHandler = () => {
    setToaster(undefined)
  }
  

  const searchHandler = (result: string) => {
    advanceSearch.current = result;
    // fetchData()
    setRequestRefresh(true)
  }

  
  return (
    <React.Fragment>
      
      <div className='card card-custom'>
        <div className='card-body'>
          <DeleteQuoteModal
            show={modalShow}
            handleClose={closeModal}
            quoteData={deleteData}
            deleteCallback={deleteHandler}
          />
      
          <SendQuotePdfModal
            show={modalSendQuotePdfShow}
            handleClose={closeSendQuotePdfShow}
            quoteData={selectedQuoteData}
            onSendQuotePdf={sendQuotePdfHandler}
          />
         
          <div className='row justify-content-between align-items-center'>
            <div className='d-flex actions'>
              <button
                className='btn btn-primary col-auto me-auto'
                onClick={() => {
                  setSelectedData(QUOTE_FORM_DEFAULT)
                  history.push('/quote/new')
                }}
              >
                <i className='bi bi-plus-lg'></i> New Quote
              </button>
            </div>
          </div>
          {toaster && <CustomAlert {...toaster} />}
          <div className='App'>
            {isLoading && loadingPanel}
            <SearchWidget1 search={searchHandler} shouldClearSearch ={false}></SearchWidget1>
            <QouteGrid actionHandler={actionHandler} isSending={isSending} advanceSearch={advanceSearch.current}
              requestRefresh={requestRefresh} doneRequestHandler={() => {setRequestRefresh(false)}}></QouteGrid>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export { QuoteList }
