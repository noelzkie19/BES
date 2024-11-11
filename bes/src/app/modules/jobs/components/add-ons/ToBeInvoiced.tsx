import React, {useState} from 'react'
const ToBeInvoiced: React.FC = () => {
  const [checked, setChecked] = useState(false)
  const toBeInvoiced = () => {
    setChecked((current) => !current)
  }
  return (
    <div className='row'>
      <div className='col-md-6'>
        <div className='checkbox-list mb-4 d-flex align-items-center'>
          <label className='checkbox'>
            <input type='checkbox' onChange={toBeInvoiced} className='me-4' />
            <span>To be Invoiced</span>
          </label>
        </div>
      </div>
      <div className='col-md-6'>
        <div className={checked ? 'd-block' : 'd-none'}>
          <label className='form-label' htmlFor=''>
            Invoice Number
          </label>
          <input type='text' className={`form-control`} />
        </div>
      </div>
    </div>
  )
}

export default ToBeInvoiced
