import {FC} from 'react'
import {dateFormat} from '../../../../shared/service/utils'

interface Props {
  poNumber: string
  date: Date | null | string
  isPrint: boolean
  createdBy: string | undefined
}

const PurchaseHeader: FC<Props> = ({poNumber, date, createdBy}) => {
  let d = new Date()
  if (date != null) {
    d = new Date(date.toString())
  }
  let ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d)
  let mo = new Intl.DateTimeFormat('en', {month: 'short'}).format(d)
  let da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d)

  return (
    <div className='grid-3 no-break mb-5'>
      <div className='d-flex justify-content-between'>
        <img src='/images/logo.png' alt='BES logo' className='h-50px className="ms-2"' />
        <h1 className={`text-center mb-5 fw-bold`}>Purchase Order</h1>
        <div className='me-2 fw-bold text-decoration-underline'>
          <div style={{display: 'table', width: '100%'}}>
            <div style={{display: 'table-row-group'}}>
              <div style={{display: 'table-row'}}>
                <div
                  style={{
                    display: 'table-cell',
                    textAlign: 'right',
                    textDecoration: 'underline',
                    fontWeight: 'bold',
                  }}
                >
                  Purchase Order #:
                </div>
                <div
                  style={{
                    display: 'table-cell',
                    paddingLeft: '8px',
                    textDecoration: 'underline',
                    fontWeight: 'bold',
                  }}
                >
                  {poNumber}
                </div>
              </div>
              <div style={{display: 'table-row'}}>
                <div
                  style={{display: 'table-cell', textAlign: 'right', textDecoration: 'underline'}}
                >
                  Date:
                </div>
                <div
                  style={{display: 'table-cell', paddingLeft: '8px', textDecoration: 'underline'}}
                >{`${da}-${mo}-${ye}`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchaseHeader
