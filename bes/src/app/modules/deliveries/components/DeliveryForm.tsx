import {current} from '@reduxjs/toolkit'
import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'

const DeliveryForm: React.FC = () => {
  const history = useHistory()

  const [checked, setChecked] = useState(false)
  return (
    <React.Fragment>
      <form name='delivery'>
        <div className='modal-body'>
          <div className='d-flex actions'>
            <button type='reset' className='btn btn-primary col-auto me-auto'>
              Clear
            </button>

            <button
              type='submit'
              className='btn btn-outline-primary col-auto me-4'
              onClick={() => {
                history.push('/delivery/list')
              }}
            >
              Back
            </button>
            <button type='submit' className='btn btn-primary col-auto'>
              Save
            </button>
          </div>
        </div>
        <div className='row align-items-end mt-6'>
          <div className='col-lg-3 col-md-3 col-12 mb-4'>
            <label className='form-label' htmlFor=''>
              Quantity Send
            </label>
            <input type='text' className={`form-control`} />
          </div>
          <div className='col-lg-3 col-md-3 col-12 mb-4'>
            <label className='form-label' htmlFor=''>
              Client Name
            </label>
            <input type='text' className={`form-control`} />
          </div>
          <div className='col-lg-3 col-md-3 col-12 mb-4'>
            <label className='form-label' htmlFor=''>
              Job
            </label>
            <input type='text' className={`form-control`} />
          </div>
          <div className='col-lg-3 col-md-3 col-12 mb-4'>
            <label className='form-label' htmlFor=''>
              Order No.
            </label>
            <input type='text' className={`form-control`} />
          </div>
        </div>
        <div className='row align-items-end mt-6'>
          <div className='col-lg-3 col-md-3 col-12 mb-4'>
            <label className='form-label' htmlFor=''>
              Drawing
            </label>
            <input type='text' className={`form-control`} />
          </div>
          <div className='col-lg-3 col-md-3 col-12 mb-4'>
            <label className='form-label' htmlFor=''>
              Revision
            </label>
            <input type='text' className={`form-control`} />
          </div>
          <div className='col-lg-6 col-md-6 col-12 mb-4'>
            <label className='form-label' htmlFor=''>
              Description
            </label>
            <input type='text' className={`form-control`} />
          </div>
        </div>
        <div className='row align-items-end mt-6'>
          <div className='col-lg-3 col-md-3 col-12 mb-4'>
            <label className='form-label' htmlFor=''>
              Quantity
            </label>
            <input type='text' className={`form-control`} />
          </div>
          <div className='col-lg-3 col-md-3 col-12 mb-4'>
            <label className='form-label' htmlFor=''>
              Sent
            </label>
            <input type='text' className={`form-control`} />
          </div>
          <div className='col-lg-3 col-md-3 col-12 mb-4'>
            <label className='form-label' htmlFor=''>
              Due Date
            </label>
            <input type='date' className={`form-control`} />
          </div>
        </div>

        <div className='row d-flex align-items-start mt-6 d-flex'>
          <div className='col-md-3 mb-4'>
            <label className='form-label' htmlFor=''>
              Quantity
            </label>
            <select className={`form-control`}>
              <option>option 1</option>
              <option>option 2</option>
              <option>option 3</option>
            </select>

            <label className='form-label mt-6' htmlFor=''>
              Courier Cost
            </label>
            <input type='text' className={`form-control`} />
          </div>
          <div className='col-md-9 mb-4'>
            <label className='form-label' htmlFor=''>
              Delivery Notes
            </label>
            <textarea className='form-control'></textarea>
          </div>
        </div>
      </form>
    </React.Fragment>
  )
}

export {DeliveryForm}
