import classes from '../ui/QuoteReport.module.css'
import React from 'react'
import {IQuote} from '../../models/quote-model'
import {Material} from '../../models/quote-model'
import {CurrencyFormatter, dateFormat} from '../../../../shared/service/utils'

interface Props {
  refs?: any
  dataItems: any[]
}

const getFirstWord = (inputString: string): string | null => {
  if (!inputString) return ''
  const words = inputString.trim().split(/\s+/)
  return words.length > 0 ? words[0] : null
}

const getPaymentTerm = (dataItem: any): string => {
  let paymentTerm = ''
  if (dataItem.is30DaysFromInv) paymentTerm = '30 Days From Invoice '
  else if (dataItem.isDepositReceivedCOD)
    paymentTerm += '50% deposit received with final payment due COD Days From Invoice '
  else if (dataItem.isCod) paymentTerm += 'COD '
  else if (dataItem.progressPaymentRequired) paymentTerm += 'Progress Payment Required '

  return paymentTerm
}

const NewQuoteReportPrintDetails: React.FC<Props> = ({refs, dataItems}) => {
  let hasAddress = 0
  let street = ''
  let suburb = ''
  let state = ''
  let postCode = ''

  let d = Date.now()
  let ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d)
  let mo = new Intl.DateTimeFormat('en', {month: 'short'}).format(d)
  let da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d)

  const computeTotal = (dataItem: any) => {
    let totalCost = 0
    if (dataItem.details != undefined) {
      for (var i = 0; i < dataItem.details.length; i++) {
        totalCost += dataItem.details[i].totalCost
      }
    }
    return totalCost
  }

  const ContentBody = (props: any) => (
    <div className={classes.quoteReport}>
      <div className='mb-5'>
        <div className='row'>
          <div className='col-7'>
            <img src='/images/logo.png' alt='BES logo' className='h-70px' />
          </div>
          <div className='col-5' style={{textAlign: 'right'}}>
            <address>
              <b>Brisbane Engineering Services Pty Ltd</b>
              <br />
              ABN: 74.537.697.586
              <br />
              4/12 Maiella Street Stapylton QLD 4207
              <br />
              Ph: 07 3807 9918
            </address>
          </div>
        </div>
      </div>
      <span>{`${da}-${mo}-${ye}`}</span>
      <br />
      <br />
      {props.dataItem != null ? (
        <span>
          {props.dataItem.clientContactPerson}
          <br />
          {props.dataItem.clientName}
          <br />
        </span>
      ) : (
        <></>
      )}
      {hasAddress > 0 ? (
        <address>
          {street} <br />
          {suburb} <span className='text-uppercase'>{state}</span> {postCode}
        </address>
      ) : (
        <p>
          First Name
          <br />
          Company Name
          <br />
          Address
          <br />
          Suburb State Pcode
        </p>
      )}
      {props.dataItem != null ? (
        <p>Dear {getFirstWord(props.dataItem.clientContactPerson)},</p>
      ) : (
        <p>Dear First Name</p>
      )}
      {props.dataItem != null ? (
        <p>
          <b>RE: QUOTATION NUMBER: {`${props.dataItem.quoteNumber} `} </b>
        </p>
      ) : (
        <div>
          <b>RE: QUOTATION NUMBER: XXXXXX</b>
        </div>
      )}
      <p>
        With a strong emphasis on quality Brisbane Engineering Services provides its clients with
        first class components and services. I appreciate you giving BES the opportunity to submit
        this quote which is based on your requests.
      </p>

      <table style={{width: '100%'}}>
        <thead>
          <tr>
            <th className='ps-2'>
              <b>Description</b>
            </th>
            <th className='ps-2'>
              <b>Drawing#</b>
            </th>
            <th className='ps-2'>
              <b>Rev#</b>
            </th>
            <th className='ps-2'>
              <b>Qty</b>
            </th>
            <th className='ps-2'>
              <b>Cost Per</b>
            </th>
            <th className='ps-2'>
              <b>Total Cost</b>
            </th>
            <th className='ps-2'>
              <b>Est Lead Time**</b>
            </th>
          </tr>
        </thead>
        {props.dataItem != null && (
          <tbody>
            {' '}
            <tr key={100}>
              <td className='ps-2'>{props.dataItem.description}</td>
              <td></td>
              <td></td>
              <td></td>
              <td className='ps-2'>{/* {CurrencyFormatter(x.totalPrice)} */}</td>
              <td className='ps-2'>{CurrencyFormatter(computeTotal(props.dataItem))}</td>
              <td>{/* {dataItem.estLeadTime} */}</td>
            </tr>
            {props.dataItem != null &&
              (props.dataItem.details || []).map((x: any, id: number) => {
                return (
                  <tr key={id}>
                    <td className='ps-2'>{x.description}</td>
                    <td>{props.dataItem.drawingNumber}</td>
                    <td>{props.dataItem.revisionNumber}</td>
                    <td className='ps-2'>{x.quantity}</td>
                    <td className='ps-2'>{CurrencyFormatter(x.costPerUnit)}</td>
                    <td className='ps-2'></td>
                    <td>{/* {dataItem.estLeadTime} */}</td>
                  </tr>
                )
              })}
          </tbody>
        )}
      </table>
      {props.dataItem != null ? (
        <p>Payment terms: {`${getPaymentTerm(props.dataItem)} `}</p>
      ) : (
        <p>Payment terms: 30-days from invoice</p>
      )}

      {props.dataItem != null ? (
        <p> Please note: {`${props.dataItem.setupText}`}</p>
      ) : (
        <p> Please note: ss</p>
      )}
      <p>
        *Price excluded Freight & GST.
        <br />
        ** Delivery date will be confirmed once your order has been received.
      </p>
      <p>
        Thank you once again for the opportunity to provide this quote. Should you have any queries
        please do not hesitate to contact me directly.
      </p>
      <p>Yours sincerely</p>
      <img src='/images/andrew_sig.png' alt='BES logo' className='h-70px' />
      <p>Andrew Cairns</p>

      <p style={{textAlign: 'center'}}>Terms and Conditions of Sale</p>
      <ul>
        {/* <li>Quotation is valid for 30 days. </li> */}
        <li>
          The quoted amount is based on the specifications discussed to date. Any additions or
          alterations will be quoted for separately.
        </li>
        {/* <li>
              The quoted amount is based on the specifications discussed to date. Any additions or
              alterations will be quoted for separately.
            </li> */}
        <li>This project will be paid as per the payment terms listed above</li>
        <li>
          All components remain the property of Brisbane Engineering Services until invoice is paid
          in full.
        </li>
        <li>For full terms and Conditions of Sale, please contact Brisbane Engineering Service</li>
      </ul>
    </div>
  )

  //   if (dataItem != undefined) {
  //     for (var i = 0; i < dataItem.materials.length; i++) {
  //       totalCost += dataItem.materials[i].totalPrice
  //     }
  //   }
  //   if (dataItem != undefined) {
  //     if (dataItem.clientAddresses.length != 0) {
  //       hasAddress = 1

  //       let defaultClientAddresses = dataItem.clientAddresses.find((x: {default: boolean}) => {
  //         return x.default === true
  //       })

  //       if (defaultClientAddresses !== undefined && defaultClientAddresses !== null) {
  //         street = defaultClientAddresses.street
  //         suburb = defaultClientAddresses.suburb
  //         state = defaultClientAddresses.state
  //         postCode = defaultClientAddresses.postCode
  //       }
  //     }
  //   }

  return (
    <div
      ref={refs}
      style={{
        marginLeft: '15px',
        marginRight: '15px',
        padding: '0',
        background: '#ffffff',
        fontSize: '12px',
      }}
    >
      {(dataItems || []).map((dataItem, idx, arr) => {
        const nextHeader = arr[idx + 1]
        return (
          <React.Fragment>
            <ContentBody dataItem={dataItem}></ContentBody>
            {nextHeader ? <div className='page-break' /> : ''}
          </React.Fragment>
        )
      })}
    </div>
  )
}
export default NewQuoteReportPrintDetails
