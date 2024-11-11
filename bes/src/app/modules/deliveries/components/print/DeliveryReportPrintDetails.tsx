import { useEffect, useState } from 'react'
import { CurrencyFormatter, dateFormat } from '../../../../shared/service/utils'
import { IDeliveryReport } from '../../models/delivery-model'
import classes from '../ui/DeliveryReport.module.css'
interface IMyProps {
  refs?: any,
  printData: IDeliveryReport[]
}

const DeliveryReportPrintDetails: React.FC<IMyProps> = ({ refs, printData}) => {
  const [total, setTotal] = useState<number>(0)
  
  useEffect(() => {
    if (printData && printData.length > 0) {
      const deliveryTotal = printData.reduce((accumulator: any, obj: any) => {
        return accumulator + obj.price;
      }, 0);
      setTotal(deliveryTotal)
    } else {
      setTotal(0)
    }
  }, [printData])
 
  return (
    <div className={classes.deliveryReport} ref={refs}>
      <div className='mb-5'>
        <div className='row'>
          <div className='col-8'>
            <img src='/images/logo.svg' alt='BES logo' className='h-70px' />
          </div>
          <div className='col-4'>
            <h2 style={{textAlign: 'right'}}>Delivery Report</h2>
          </div>
        </div>
      </div>

      <table
        style={{borderWidth: '1px', borderColor: '#000000', borderStyle: 'solid', width: '100%'}}
      >
        <thead>
          <tr>
            <th>
              <b>Job No.</b>
            </th>
            <th>
              <b>Description</b>
            </th>
            <th>
              <b>Delivery</b>
            </th>
            <th>
              <b>Customer</b>
            </th>
            <th>
              <b>Qty Sent </b>
            </th>
            <th>
              <b>Delivery Date</b>
            </th>
            <th>
              <b>Price</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            (printData || []).map((data: IDeliveryReport, idx: number) => {
              return (
                <tr key={idx}>
                  <td>{data.jobId}</td>
                  <td>{data.description}</td>
                  <td>{data.deliveryNumber}</td>
                  <td>{data.clientName}</td>
                  <td>{data.quantity}</td>
                  <td>{dateFormat(data.date)}</td>
                  <td>{CurrencyFormatter(data.price)}</td>
                </tr>
              )
            })
          }
          <tr>
            <td colSpan={6} align='right' style={{ borderRight: 0 }}>
              <b>Sub Total:</b>
            </td>
            <td style={{ borderLeft: 0 }}>
              <b>{CurrencyFormatter(total)}</b>
            </td>
          </tr>
          <tr>
            <td colSpan={6} align='right' style={{ borderRight: 0 }}>
              <b>Total:</b>
            </td>
            <td style={{ borderLeft: 0 }}>
              <b>{CurrencyFormatter(total)}</b>
            </td>
          </tr>
        </tbody>
        <tfoot>
        
        </tfoot>
      </table>
    </div>
  )
}

export default DeliveryReportPrintDetails
