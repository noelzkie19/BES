import {useEffect, useState} from 'react'
import {unique} from '../../../../shared/service/utils'
import {trasformDeliveryLineToClient} from '../../transformer/delivery-transformer'
import {DocketHeader} from './DocketHeader'
interface IMyProps {
  refs?: any
  deliveryData?: any
}

const DeliveryDocketPrint: React.FC<IMyProps> = ({refs, deliveryData}) => {
  const [headers, setHeaders] = useState<any[]>([])
  const [deliveryNote, setDeliveryNote] = useState<string>('')

  useEffect(() => {
    if (deliveryData && deliveryData.jobDeliveryLines) {
      if (deliveryData.jobDeliveryLines.length > 0) {
        setDeliveryNote(deliveryData.jobDeliveryLines[0].notes)
      }
      const data = trasformDeliveryLineToClient(deliveryData).filter(unique)
      setHeaders(data)
    }
  }, [deliveryData])

  return (
    <div ref={refs}>
      {(headers || []).map((header, idx, arr) => {
        const nextHeader = arr[idx + 1]
        return (
          <div key={idx}>
            <DocketHeader printHeader={header} />
            <table className='border-top border-dark w-100'>
              <thead>
                <tr className='border-bottom border-dark'>
                  <th className='py-2'>
                    <b>Drawing</b>
                  </th>
                  <th className='py-2'>
                    <b>Rev.</b>
                  </th>
                  <th className='py-2'>
                    <b>Order No.</b>
                  </th>
                  <th className='py-2'>
                    <b>Description</b>
                  </th>
                  <th className='py-2'>
                    <b>Order Qty</b>
                  </th>
                  <th className='py-2'>
                    <b>B.O. Qty</b>
                  </th>
                  <th className='py-2'>
                    <b>Send Qty</b>
                  </th>
                  <th className='py-2'>
                    <b>Job Number</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                {(
                  deliveryData.jobDeliveryLines.filter(
                    (x: any) => x.clientId === header.clientId
                  ) || []
                ).map((detail: any, didx: any) => {
                  return (
                    <tr key={didx} className='border-bottom border-dark'>
                      <td className='py-2'>{detail.drawingNumber}</td>
                      <td className='py-2'>{detail.revisionNumber}</td>
                      <td className='py-2'>{detail.orderNumber}</td>
                      <td className='py-2'>{detail.description}</td>
                      <td className='py-2'>{detail.balanceQuantity + detail.quantitySent}</td>
                      <td className='py-2'>{detail.balanceQuantity}</td>
                      <td className='py-2'>{detail.quantitySent}</td>
                      <td className='py-2'>{detail.jobId}</td>
                    </tr>
                  )
                })}
              </tbody>
              {deliveryNote ? (
                <tbody>
                  <tr>
                    <td className='py-2' colSpan={8}>
                      <strong>Notes:</strong> {deliveryNote}
                    </td>
                  </tr>
                </tbody>
              ) : (
                ''
              )}
              <tfoot>
                <tr>
                  <td colSpan={8}>
                    <br />
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className='page-footer fs-6 py-2'>
              <table className='w-75'>
                <tbody>
                  <tr>
                    <th className='text-nowrap fw-normal ps-5'>Received By:</th>
                    <td className='pe-5' style={{width: '35%', borderBottom: '1px solid'}}>
                      &nbsp;
                    </td>
                    <th className='text-nowrap fw-normal ps-5'>Signature By:</th>
                    <td className='pe-5' style={{width: '25%', borderBottom: '1px solid'}}>
                      &nbsp;
                    </td>
                    <th className='text-nowrap fw-normal ps-5'>Date By:</th>
                    <td className='pe-5' style={{width: '15%', borderBottom: '1px solid'}}>
                      &nbsp;
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {nextHeader ? <div className='page-break' /> : ''}
          </div>
        )
      })}
    </div>
  )
}

export default DeliveryDocketPrint
