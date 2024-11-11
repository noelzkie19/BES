
// import { deleteQuote } from '../api'
import { IQuote } from '../../models/quote-model'
import React, { useRef, useState } from 'react'
import QuoteReportPrintDetails from '../print/QuoteReportPrintDetails'
import { ConverQuoteToJobModal } from '../modal/ConvertToJobModal'

interface IProps {
    quoteData?: IQuote
}

const ConvertQuoteToJobBtn: React.FC<IProps> = ({ quoteData }) => {
    const [modalConvertShow, setConvertModalShow] = useState(false)

    const convertQuoteHandler = () => {
        setConvertModalShow(false);
    }
    
    const closeConvertModal = () => {
        setConvertModalShow(false)
    }

    return (
        <React.Fragment>
           <ConverQuoteToJobModal
            show={modalConvertShow}
            handleClose={closeConvertModal}
            quoteData={quoteData}
            convertCallback={convertQuoteHandler}
          />
          <button type='button'  className='btn btn-primary col-auto me-5' 
            onClick={() => {
                setConvertModalShow(true)
            }}>
            Convert to Job
          </button>
        </React.Fragment>
        
    )
}

export { ConvertQuoteToJobBtn } 