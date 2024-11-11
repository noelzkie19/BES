import { useState } from "react"
import { dataProvider } from "../../../../shared/data/data-provider"
import { dateFormat, dateFormatddMMMyy } from "../../../../shared/service/utils"
import { IStates } from "../../../clients/models/config-model"

interface IMyProps {
  printHeader?: any
}


const DocketHeader: React.FC<IMyProps> = ({ printHeader }) => {
  const [optionStates] = useState<IStates[]>(dataProvider.states)

  return (
    <div className='row'>
      <div className='col-4'>
        <img src='/images/logo.svg' alt='BES logo' className='h-70px' />
        <p>
          <b>Brisbane Engineering Services Pty Ltd</b>
          <br />
          4/12 Maiella Street
          <br />
          Stapylton QLD 4207
          <br />
          <br />
          Phone: +61 3807 9918
          <br />
          ABN: 74 537 697 586
        </p>
      </div>
      <div className='col-4'>
        <table style={{ marginTop: '45px' }} className='w-100'>
          <tr>
            <td className='w-25'>
              <h3><u>Date:</u></h3>
            </td>
            <td className='w-75'>
              <h3><u>{dateFormatddMMMyy(printHeader.date)}</u></h3>
            </td>
          </tr>
          <tr>
            <td>
              <h3><u>Ship Via:</u></h3>
            </td>
            <td>
            </td>
          </tr>
        </table>
      </div>
      <div className='col-4'>
        <div style={{ fontSize: '25px', fontWeight: 'bold' }}>Delivery Docket {printHeader.deliveryNumber}</div>
        <div className="mt-2 mb-2">Ship To:</div>
        <div style={{
          borderWidth: '1px', borderColor: '#000000', borderStyle: 'solid',
          padding: '10px', boxShadow: '10px 5px 5px black'
        }}>
          <div>{printHeader.clientName}</div>
          <div>{printHeader.street}</div>
          <div>{printHeader.suburb}</div>
          <div className="d-flex mt-5">
            <div style={{ marginRight: '20px' }}>{
              optionStates.find(x => x.code === printHeader.state)?.value
            }</div>
            <div>{printHeader.postCode}</div>
          </div>
        </div>
      </div>
      <div className="col-12 mb-2">
        “Thank you for supporting Australian manufacturing - providing local jobs“

      </div>
    </div>
  )
}

export { DocketHeader }

