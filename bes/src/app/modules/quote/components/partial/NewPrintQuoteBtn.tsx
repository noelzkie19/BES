import {Modal} from 'react-bootstrap-v5'
import {confirmQuote, printQuote} from '../../api'
// import { deleteQuote } from '../api'
import {IQuote} from '../../models/quote-model'
import React, {useRef, useState} from 'react'
import {useReactToPrint} from 'react-to-print'
import {PrintQuoteModal} from '../modal/PrintQuoteModal'
import QuoteReportPrintDetails from '../print/QuoteReportPrintDetails'
import {PrintQuoteOptionModal} from '../modal/PrintQuoteOptionModal'
import NewQuoteReportPrintDetails from '../print/NewQuoteReportPrintDetails'

interface IProps {
  currentQuote: string
  versions?: string[]
  donePrint: () => void
}

const NewPrintQuoteBtn: React.FC<IProps> = ({currentQuote, donePrint, versions}) => {
  const componentRefDetails = useRef<any>()
  const [modalPrintShow, setPrintModalShow] = useState(false)
  const [printedData, setPrintedData] = useState<any>([])

  const printQuoteHandler = (data: any[]) => {
    setPrintedData(data)
    setTimeout(() => {
      printHandler()
    }, 1000)
  }

  const printHandler = useReactToPrint({
    content: () => componentRefDetails.current,
    pageStyle: ` .root {
          margin: 0;
          padding: 0
        }
    
        @media all {
          .page-break {
            display: none;
          }
        }
    
        @media print {
          html,
          body {
            height: initial !important;
            overflow: initial !important;
            -webkit-print-color-adjust: exact;
            table {
              border: solid red !important;
              border-width: 1px 0 0 1px !important;
            }
            th, td {
                border: solid red !important;
                border-width: 0 1px 1px 0 !important;
            }
          }
          @page :footer {
            display: none
          }
        
          @page :header {
              display: none
          }
        }
    
        @media print {
          .page-break {
            margin-top: 20px;
            display: block;
            page-break-after: always;
          }
          .page-notes {
            bottom: 0px;
            width: 100%;
            height: 50px;
            font-size: 15px;
          }
          .page-footer {
            position: fixed;
            z-index: 9;
            bottom: 0;
            width: 100%;
            height: 50px;
            font-size: 15px;
            opacity: 0.5;
            page-break-after: always;
          }
        }`,
    onAfterPrint() {
      setPrintModalShow(true)
    },
  })

  return (
    <React.Fragment>
      <PrintQuoteOptionModal
        handleClose={() => {
          setPrintModalShow(false)
        }}
        show={modalPrintShow}
        versions={versions}
        currentQuote={currentQuote}
        printQuote={printQuoteHandler}
      ></PrintQuoteOptionModal>

      <div style={{display: 'none'}}>
        <NewQuoteReportPrintDetails refs={componentRefDetails} dataItems={printedData} />
      </div>

      <button
        type='button'
        className='btn btn-primary col-auto me-5'
        onClick={() => {
          setPrintModalShow(true)
        }}
      >
        Print Quote
      </button>
    </React.Fragment>
  )
}

export {NewPrintQuoteBtn}
