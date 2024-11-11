import React, {useState} from 'react'
import * as ReactDOM from 'react-dom'
import {DatePicker} from '@progress/kendo-react-dateinputs'
import '@progress/kendo-theme-material/dist/all.css'

const JobReportForm: React.FC = () => {
  const defaultValue = new Date()
  const min = new Date(2000, 2, 10)
  const max = new Date(2002, 2, 10)

  const [valuefrom, setValuefrom] = React.useState(new Date())
  const [enableTo, setEnableTo] = React.useState(true)
  const [isCustomer, setIsCustomer] = useState<boolean>(false)

  const isCustomerHandler = () => {
    setIsCustomer((current) => !current)
  }

  const dateFromHandler = (event: any) => {
    setValuefrom(event.target.value)
    setEnableTo(false)
  }

  return (
    <form name='receiptPurchaseItem'>
      <div className='modal-body'>
        <div className='row mb-4'>
          <div className='col col-md-6 pe-2  mb-4'>
            <label className='form-label' htmlFor=''>
              From
            </label>

            <DatePicker
              format={'dd/MM/yyyy'}
              onChange={dateFromHandler}
              placeholder='Select Date'
            />
          </div>
          <div className='col col-md-6 pe-2  mb-4'>
            <label className='form-label' htmlFor=''>
              To
            </label>
            <DatePicker
              format={'dd/MM/yyyy'}
              min={valuefrom}
              disabled={enableTo}
              placeholder='Select Date'
            />
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col col-md-12 pe-2  mb-4'>
            <label className='form-label' htmlFor=''>
              Customers
            </label>
            <div className='row'>
              <div className='col-md-2 m-auto'>
                <div className='checkbox-list'>
                  <label className='checkbox me-5'>
                    <input type='checkbox' name='all' value='all' onChange={isCustomerHandler} />{' '}
                    <span>All</span>
                  </label>
                </div>
              </div>
              <div className='col-md-10'>
                <select className={`form-control`} disabled={isCustomer}>
                  <option>option 1</option>
                  <option>option 2</option>
                  <option>option 3</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col col-md-12 pe-2  mb-4'>
            <label className='form-label' htmlFor=''>
              Sort By{' '}
            </label>
            <div className='checkbox-list mb-3 d-flex align-items-buttom'>
              <label className='checkbox me-5'>
                <input type='radio' name='sortBy' /> <span>Job Number</span>
              </label>
              <label className='checkbox  me-5'>
                <input type='radio' name='sortBy' /> <span>Customer Name</span>
              </label>
              <label className='checkbox'>
                <input type='radio' name='sortBy' /> <span>Date</span>
              </label>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col col-md-12 pe-2  mb-4'>
            <label className='form-label' htmlFor=''>
              Order By{' '}
            </label>
            <div className='checkbox-list mb-3 d-flex align-items-buttom'>
              <label className='checkbox me-5'>
                <input type='radio' name='orderBy' /> <span>Ascending</span>
              </label>
              <label className='checkbox  me-5'>
                <input type='radio' name='orderBy' /> <span>Descending</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default JobReportForm
