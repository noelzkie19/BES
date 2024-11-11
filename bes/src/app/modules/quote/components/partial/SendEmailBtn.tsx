
// import { deleteQuote } from '../api'
import { IQuote } from '../../models/quote-model'
import React, { useRef, useState } from 'react'
import QuoteReportPrintDetails from '../print/QuoteReportPrintDetails'
import { useReactToPrint } from 'react-to-print'
import { CustomAlert, IAlert } from '../../../../shared/components/CustomAlert'
import jsPDF from 'jspdf'
import { sendEmailQuotePdf } from '../../api'
import { usePageData } from '../../../../../_metronic/layout/core'
import { SendQuotePdfModal } from '../modal/SendQuotePdfModal'

interface IProps {
    quoteData?: any
    setToaster: (toaster: IAlert | undefined) => void
}

const SendEmailBtn: React.FC<IProps> = ({ quoteData, setToaster }) => {
    const [isSending, setIsSending] = useState(false)
    const componentRefDetails = useRef<any>()
    const {currentUser} = usePageData()
    const [modalSendQuotePdfShow, setSendQuotePdfShow] = useState(false)
    // convert print to blob
    const sendEmailQuotePdfPrintHandler = useReactToPrint({
        content: () => componentRefDetails.current,
        print: async () => {
        const pdfDocument = componentRefDetails.current
        if (!pdfDocument) return
            setIsSending(true)

        setToaster({
            message: `Please wait while sending ${quoteData?.quoteNumber} to ${quoteData?.clientEmail} .`,
            header: `Sending the Quote.`,
            type: 'info'
        })

        const doc = new jsPDF('p','pt')
        doc.setFont('Helvetica');

        const options = {
            callback: function () {
            const blobUri = doc.output('blob')
            const title = `Quote Number ${quoteData?.id}.pdf`
            const file = new File([blobUri], title)
            // set timeout for render delay
            setTimeout(() => {
                sendEmailQuotePdf(
                    file,
                    quoteData?.clientEmail,
                    currentUser.email,
                    quoteData?.clientName,
                    quoteData?.quoteNumber,
                    quoteData?.id,
                    quoteData?.clientId
                )
                .then(() => {
                    setToaster({
                    message: `Quote send successfully to email ${quoteData?.clientEmail} .`,
                    header: `Quote sent.`,
                    type: 'primary'
                    })
                }).catch((err) => {
                    console.log(err)
                    setToaster({
                    message: `Server Error. Please try again later.`,
                    header: `Quote sent.`,
                    type: 'danger'
                    })
                })
                .finally(() => setIsSending(false))
            }, 3000)
            },
            width: 840,
            windowWidth: 800,
            html2canvas: {scale: 0.74}
        };
        doc.html(pdfDocument, options)
       },
    })
   
    const closeSendQuotePdfShow = () => {
        setSendQuotePdfShow(false)
    }
    const sendQuotePdfHandler = () => {
        setSendQuotePdfShow(false);
        sendEmailQuotePdfPrintHandler()
    }
    
    return (
        <React.Fragment>
            <div style={{ display: 'none' }}>
                <QuoteReportPrintDetails
                refs={componentRefDetails}
                dataItem={quoteData}
                />
            </div>
         <SendQuotePdfModal
            show={modalSendQuotePdfShow}
            handleClose={closeSendQuotePdfShow}
            quoteData={quoteData}
            onSendQuotePdf={sendQuotePdfHandler}
            />

          <button type='button'  className='btn btn-primary col-auto me-5' 
            disabled={isSending}
            onClick={() => {
                setSendQuotePdfShow(true);
            }}>
            Send Email
          </button>
        </React.Fragment>
        
    )
}

export { SendEmailBtn } 