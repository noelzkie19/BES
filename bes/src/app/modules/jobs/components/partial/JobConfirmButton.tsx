
import jsPDF from 'jspdf';
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { IAlert } from '../../../../shared/components/CustomAlert';
import { sendJobConfirmPrint } from '../../api';
import { IEditData, IJobPurchaseData, ISelectedClientData } from '../../models/job-model';
import { ConfirmJobModal } from '../modal/ConfirmJobModal';
import ConfirmJobPrintDetails from '../toPrint/ConfirmJobPrintDetails';

interface IProps {
  jobData: IEditData
  purchaseOrder: IJobPurchaseData[]
  isCanEdit: boolean
  selectedClient: ISelectedClientData
  setToaster: (jobData: IAlert) => void
  btnRef?: any
}


const JobConfirmButton: React.FC<IProps> = ({ jobData, purchaseOrder, isCanEdit, selectedClient, setToaster, btnRef }) => {
  const [ShowConfirmJobModal, setShowConfirmJobModal] = React.useState<boolean>(false)
  const componentRefConfirmJob = useRef<any>()
  const [isSending, setIsSending] = useState<boolean>(false)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('confirm') === 'true') {
      setShowConfirmJobModal(true)
    } else {
      setShowConfirmJobModal(false)
    }
  }, [window.location.search])

  const confirmJobPrintHandler = useReactToPrint({
    pageStyle: ` .root {
            margin: 0;
            padding: 0
          }
      
          @media all {
            .page-break {
              display: none;
            }
            {
                (jobData && selectedClient) && (
                  <div className='btn-action'>
                        <div style={{ display: 'none' }}>
                            <ConfirmJobPrintDetails
                                refs={componentRefConfirmJob}
                                purchaseOrder={purchaseOrder}
                                jobData={jobData}
                                selectedClient={selectedClient}
                            />
                        </div>
                        <button
                            type='button'
                            className='btn btn-primary col-auto me-5 btn-action'
                            disabled={isSending}
                            ref={btnRef}
                            onClick={() => setShowConfirmJobModal(true)}
                            tabIndex={22}
                        >
                            Confirm Job
                        </button>
                  </div>
                )
            }
          
            @page :header {
                display: none
            }
          }
      
          @media print {
            @page {size: portrait}
            .page-break {
              margin-top: 20px;
              display: block;
              page-break-after: always;
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
    content: () => componentRefConfirmJob.current,
    onBeforePrint: () => {
      setShowConfirmJobModal(false)
    }
  })

  const confirmJobSendHandler = useReactToPrint({
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
    content: () => componentRefConfirmJob.current,
    onBeforePrint: () => {
      setShowConfirmJobModal(false)
    },
    print: async () => {
      const pdfDocument = componentRefConfirmJob.current
      if (!pdfDocument) return
      setIsSending(true)
      setToaster({
        message: `Please wait while sending email to ${selectedClient?.email}.`,
        header: `Sending purchase order`,
        type: 'info'
      })
      const html = pdfDocument.getElementsByTagName('html')[0]
      const doc = new jsPDF('p', 'pt', 'a4')
      doc.setFont('Helvetica');

      const options = {
        callback: function () {
          const blobUri = doc.output('blob')
          const title = `Job_Id_${jobData?.id}.pdf`
          const file = new File([blobUri], title)
          setTimeout(() => {
            sendJobConfirmPrint(
              file,
              selectedClient?.email,
              selectedClient.name,
              jobData?.jobId,
              jobData?.id,
              selectedClient.id
            ).then(() => {
              setToaster({
                message: `Confirm job sent successfully to email ${selectedClient?.email}.`,
                header: `Confirm job sent.`,
                type: 'primary'
              })
            }).catch((err) => {
              setToaster({
                message: `Server Error. Please try again later.`,
                header: `Confirm job sent.`,
                type: 'danger'
              })
            }).finally(() => {
              setIsSending(false)
            })
          }, 3000)
        },
        width: 840,
        windowWidth: 800,
        html2canvas: { scale: 0.74 }
      };

      doc.html(pdfDocument, options);
    }
  })

  const confirmJobHandler = (jobDataRes: any) => {
    jobData.isByHour = jobDataRes.isByHour;
    jobData.isQoutedJob = jobDataRes.isQoutedJob;
    setShowConfirmJobModal(false)

  }

  return (
    <div>
      {
        ShowConfirmJobModal && (
          <ConfirmJobModal
            proceedConfirm={confirmJobHandler}
            jobData={jobData}
            title='Confirm Job'
            toggleDialog={() => setShowConfirmJobModal(false)}
            onPrint={confirmJobPrintHandler}
            onSend={confirmJobSendHandler}
          ></ConfirmJobModal>
        )
      }
      {
        (jobData && selectedClient) && (
         
            <div style={{ display: 'none' }}>
              <ConfirmJobPrintDetails
                refs={componentRefConfirmJob}
                subAssembies={jobData.subAssembies || []}
                jobData={jobData}
                selectedClient={selectedClient}
              />
            </div>
        )
      }
       <div className='btn-action'>
          <button
            type='button'
            className='btn btn-primary col-auto me-5 btn-action'
            disabled={isSending || !isCanEdit}
            ref={btnRef}
            onClick={() => setShowConfirmJobModal(true)}
          >
            Confirm Job
          </button>
        </div>

    </div>
  );
};

export { JobConfirmButton }
