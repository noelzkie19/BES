import React from 'react'
import { CurrencyFormatter, dateFormat, dateFormatddMMMyy } from '../../../../shared/service/utils'
import { IClientAddress } from '../../../clients/models/client-model'
import { IEditData, IJobPurchaseData, ISelectedClientData, ISubAssemby } from '../../models/job-model'
import classes from '../ui/ConfirmJob.module.css'
import { dataProvider } from '../../../../shared/data/data-provider'
interface IMyProps {
  refs?: any
  subAssembies: ISubAssemby[]
  jobData: IEditData,
  selectedClient: any
}

const getFirstWord = (inputString: string): string | null => {
  const words = inputString.trim().split(/\s+/);
  return words.length > 0 ? words[0] : null;
};

const ConfirmJobPrintDetails: React.FC<IMyProps> = ({ refs, subAssembies, jobData, selectedClient }) => {
  let d = new Date();
  if (jobData.deliveryDate != null) {
    d = new Date(jobData.deliveryDate.toString())
  }
  let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
  let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
  let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

  let nd = new Date();
  if (jobData.dueDate != null) {
    nd = new Date(jobData.dueDate.toString())
  }
  let dye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(nd)
  let dmo = new Intl.DateTimeFormat('en', { month: 'short' }).format(nd)
  let dda = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(nd)


  let street = selectedClient.street
  let suburb = selectedClient.suburb
  let state = selectedClient.state
  let postCode = selectedClient.postCode
  let contactPerson = selectedClient.contactPerson
 
  const stateDescription = () => {
    const selectedState = dataProvider.states.find(x => x.code === state);
    if (selectedState) {
      state = selectedState.value;
    }
    return state;
  }

  return (
    <div ref={refs} style={{
      marginLeft: '15px', marginRight: '15px', padding: '0',
      background: '#ffffff', fontSize: '12px'
    }}>
      <div className={classes.confirmJob} ref={refs}>
        <div className='mb-5'>
          <div className='row'>
            <div className='col-7'>
              <img src='/images/logo.png' alt='BES logo' className='h-70px' />
            </div>
            <div className='col-5' style={{ textAlign: 'right' }}>
              <p>
                <b>Brisbane Engineering Services Pty Ltd</b><br />
                ABN: 74.537.697.586</p>
              <p>4/12 Maiella Street<br />
                Stapylton QLD 4207</p>
              <p>Ph: 07 3807 9918</p>
            </div>
          </div>
        </div>
        <span>{`${da}-${mo}-${ye}`}</span><br />
        <br />
        <span>
          {contactPerson}<br />
          {selectedClient.name}<br />
          {street}<br />
          {suburb} {stateDescription()} {postCode}
        </span><br />
        <br />
        <p>Dear {getFirstWord(contactPerson)},</p>
        <p>
          <b>RE: Job Confirmation</b>
        </p>
        <p>Thank you for your recent order. Please find the confirmed details below.</p>
        {/* Our Quote: Qxxxxx <br />
      */}
          Your Client Order No.: {jobData.orderNumber}
        {
          jobData.quoteNumberSource && !jobData.isByHour && (
            <p>
              Our Quote: {jobData.quoteNumberSource} <br /></p>
          )
        }
        <table style={{ borderWidth: '1px', borderColor: '#000000', borderStyle: 'solid' }} className='w-100'>
          <thead style={{ textAlign: 'center' }}>
            <tr>
              {/* <th style={{ width: '10%' }}>
                <b>PO #</b>
              </th> */}
              <th style={{ width: '20%' }}>
                <b>Description</b>
              </th>
              <th style={{ width: '10%' }}>
                <b>Drawing #</b>
              </th>
              <th style={{ width: '8%' }}>
                <b>Rev#</b>
              </th>
              <th style={{ width: '7%' }}>
                <b>Qty</b>
              </th>
              {
                 !jobData.isByHour && (
                  <th style={{ width: '10%' }}>
                      <b>Cost Per</b>
                  </th>
                 )
              }
            
              <th style={{ width: '10%' }}>
                <b>Total Cost*</b>
              </th>
              <th style={{ width: '15%' }}>
                <b>Estimated Delivery Date**</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              (subAssembies || []).map((detail, idx) => {
                return (
                  <tr key={idx}>
                    {/* <td>{detail.purchaseNumber}</td> */}
                    <td>{detail.description}</td>
                    <td>{jobData.drawingNumber}</td>
                    <td>{jobData.revisionNumber}</td>
                    <td>{detail.quantity}</td>
                    {
                      !jobData.isByHour && (
                        <td>{CurrencyFormatter(detail.salePerUnit)}</td>
                      )
                    }
                    <td>{
                       !jobData.isByHour ?  CurrencyFormatter(detail.totalPrice) : 'By Hour'
                    }</td>
                    <td>{
                      jobData.dueDate && (
                        <span>{`${dda}-${dmo}-${dye}`}</span>
                      )}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        {jobData.quotePaymentTerm && (
          <p>Payment Terms: {jobData.quotePaymentTerm}</p>
        )}
        <p>
          Please Note:<br />
          <br />
          *Price excluded Freight & GST.<br />
          <br />
          **All efforts will be made to reduce delivery times when possible. Where delivery dates are estimated to exceed the quoted lead time, you will be contacted to discuss the revised date.
        </p>
        <p>Should you have any queries please do not hesitate to contact me directly. Thank you for supporting Australian manufacturing and local employment.</p>
        <p>Yours sincerely</p>
        <img src='/images/andrew_sig.png' alt='BES logo' className='h-70px' />
        <p>Andrew Cairns</p>
      </div>
    </div>
  )
}

export default ConfirmJobPrintDetails
