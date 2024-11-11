import classes from '../ui/QuoteReport.module.css'
import React from 'react'
import {IQuote} from '../../models/quote-model'
import {Material} from '../../models/quote-model'
import {CurrencyFormatter, dateFormat} from '../../../../shared/service/utils'

interface Props {
  refs?: any
  dataItem: any
}

const getFirstWord = (inputString: string): string | null => {
  if (!inputString) return ''
  const words = inputString.trim().split(/\s+/)
  return words.length > 0 ? words[0] : null
}

const QuoteReportPrintDetails: React.FC<Props> = ({refs, dataItem}) => {
  let totalCost = 0
  let hasAddress = 0
  let street = ''
  let suburb = ''
  let state = ''
  let postCode = ''

  if (dataItem != undefined) {
    for (var i = 0; i < dataItem.materials.length; i++) {
      totalCost += dataItem.materials[i].totalPrice
    }
  }
  if (dataItem != undefined) {
    if (dataItem.clientAddresses.length != 0) {
      hasAddress = 1

      let defaultClientAddresses = dataItem.clientAddresses.find((x: {default: boolean}) => {
        return x.default === true
      })

      if (defaultClientAddresses !== undefined && defaultClientAddresses !== null) {
        street = defaultClientAddresses.street
        suburb = defaultClientAddresses.suburb
        state = defaultClientAddresses.state
        postCode = defaultClientAddresses.postCode
      }
    }
  }
  let d = Date.now()
  let ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d)
  let mo = new Intl.DateTimeFormat('en', {month: 'short'}).format(d)
  let da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d)
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
        {dataItem != null ? (
          <span>
            {dataItem.clientContactPerson}
            <br />
            {dataItem.clientName}
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
        {dataItem != null ? (
          <p>Dear {getFirstWord(dataItem.clientContactPerson)},</p>
        ) : (
          <p>Dear First Name</p>
        )}
        {dataItem != null ? (
          <p>
            <b>RE: QUOTATION NUMBER: {`${dataItem.quoteNumber} `} </b>
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
          {dataItem != null && (
            <tbody>
              {
                <tr key={'hd-1'}>
                  <td className='ps-2'>{dataItem.description}</td>
                  <td className='ps-2'></td>
                  <td className='ps-2'></td>
                  <td></td>
                  <td></td>
                  <td className='ps-2'>{CurrencyFormatter(totalCost)}</td>
                  <td className='ps-2'>{dataItem.estLeadTime}</td>
                </tr>
              }
              {dataItem != null &&
                (dataItem.materials || []).map((x: Material, id: number) => {
                  return (
                    <tr key={id}>
                      <td className='ps-2'>{x.name}</td>
                      <td>{dataItem.drawingNumber}</td>
                      <td>{dataItem.revisionNumber}</td>
                      <td className='ps-2'>{x.quantity}</td>
                      <td className='ps-2'>{CurrencyFormatter(x.unitPrice)}</td>
                      <td className='ps-2'>{/* {CurrencyFormatter(x.totalPrice)} */}</td>
                      <td>{/* {dataItem.estLeadTime} */}</td>
                    </tr>
                  )
                })}
            </tbody>
          )}
        </table>
        {dataItem != null ? (
          <p>Payment terms: {`${dataItem.paymentTerms} `}</p>
        ) : (
          <p>Payment terms: 30-days from invoice</p>
        )}

        {dataItem != null ? (
          <p> Please note: {`${dataItem.setupText}`}</p>
        ) : (
          <p> Please note: ss</p>
        )}
        <p>
          *Price excluded Freight & GST.
          <br />
          ** Delivery date will be confirmed once your order has been received.
        </p>
        <p>
          Thank you once again for the opportunity to provide this quote. Should you have any
          queries please do not hesitate to contact me directly.
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
            All components remain the property of Brisbane Engineering Services until invoice is
            paid in full.
          </li>
          <li>
            For full terms and Conditions of Sale, please contact Brisbane Engineering Service
          </li>
        </ul>
      </div>
    </div>
  )
}
export default QuoteReportPrintDetails
