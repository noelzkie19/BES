
import React, { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import DeliveryDocketPrint from '../../../deliveries/components/print/DeliveryDocketPrint';
import { IDeliveryData } from '../../../deliveries/models/delivery-model';

interface IProps {
    printData?: IDeliveryData[] | undefined,
    isSendDocket: boolean,
    setShowDeliveryPrintModal: (isShow: boolean) => void
}

const JobDeliveryDocketPrint: React.FC<IProps> = ({ printData, isSendDocket, setShowDeliveryPrintModal }) => {
    const componentRefDeliveryDocket = useRef<any>()

    useEffect(() => {
        if (isSendDocket) {
          setTimeout(() => {
            handleDeliveryDocketPrint()
          }, 100)
        }
    }, [isSendDocket])

    const handleDeliveryDocketPrint = useReactToPrint({
        pageStyle: `.root {
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
              }
            }
    
            @media print {
              .page-break {
                margin-top: 1rem;
                display: block;
                page-break-after: always;
              }
              .page-notes {
                position: fixed;
                bottom: 0;
                opacity: 0.5;
                width: 100%;
                height: 50px;
              }
              .page-footer {
                position: fixed;
                z-index: 9;
                bottom: 0;
                width: 100%;
                height: 40px;
                font-size: 15px;
                opacity: 0.75;
                page-break-after: always;
              }
            }
    
            @page {
              size: landscape !important;
            }
        `,
        content: () => componentRefDeliveryDocket.current,
        onAfterPrint () {
          setShowDeliveryPrintModal(false)
        }
      })

    return (
      <div style={{display: 'none'}}>
          <DeliveryDocketPrint refs={componentRefDeliveryDocket} deliveryData={printData} />
      </div>
    );
};

export { JobDeliveryDocketPrint }