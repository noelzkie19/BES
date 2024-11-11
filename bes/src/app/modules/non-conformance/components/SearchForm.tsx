import React, {FC, useState} from 'react'
import {useForm} from 'react-hook-form'
import {KTSVG} from '../../../../_metronic/helpers/components/KTSVG'
import IsFormVisible from './IsFormVisible'

interface IProps {}

const SearchForm: FC<IProps> = () => {
  const [isFormVisible, setIsFormVisible] = useState(false)

  const isFormVisibleHandler = () => {
    setIsFormVisible((current) => !current)
  }

  return (
    <React.Fragment>
      <form name=''>
        <div className='row align-items-center mt-6 pe-2'>
          <div className='d-flex my-2 col-12 mb-5'>
            <div className='d-flex align-items-center position-relative w-100'>
              <KTSVG
                path='/media/icons/duotune/general/gen021.svg'
                className='svg-icon-3 position-absolute ms-3'
              />
              <input
                type='text'
                id='kt_filter_search'
                className='form-control form-control-white form-search ps-9'
                placeholder='Search'
              />
              <button className='btn btn-primary col-auto btn-search'>Search</button>
            </div>
          </div>
          {isFormVisible && (
            <React.Fragment>
              <div className='row mb-4'>
                <div className='d-flex col-lg-2 col-md-2 col-6'>
                  <input
                    type='text'
                    id='kt_filter_search'
                    className='form-control form-control-white'
                    placeholder='NCR Number'
                  />
                </div>

                <div className='d-flex col-lg-2 col-md-2 col-6'>
                  <select className={`form-control`}>
                    <option>option 1</option>
                    <option>option 2</option>
                    <option>option 3</option>
                  </select>
                </div>

                <div className='d-flex col-lg-2 col-md-2 col-6'>
                  <input
                    type='date'
                    id='kt_filter_search'
                    className='form-control form-control-white'
                    placeholder='Date Recorded'
                  />
                </div>
                <div className='d-flex col-lg-2 col-md-2 col-6'>
                  <input
                    type='text'
                    id='kt_filter_search'
                    className='form-control form-control-white'
                    placeholder='Job Number'
                  />
                </div>
                <div className='d-flex col-lg-2 col-md-2 col-6'>
                  <input
                    type='text'
                    id='kt_filter_search'
                    className='form-control form-control-white'
                    placeholder='Operator'
                  />
                </div>
                <div className='d-flex col-lg-2 col-md-2 col-6'>
                  <input
                    type='text'
                    id='kt_filter_search'
                    className='form-control form-control-white'
                    placeholder='CLient NCR No.'
                  />
                </div>
              </div>
              <div className='row mb-4'>
                <div className='d-flex col-lg-2 col-md-2 col-6'>
                  <select className={`form-control`}>
                    <option>option 1</option>
                    <option>option 2</option>
                    <option>option 3</option>
                  </select>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </form>
      <IsFormVisible isClick={isFormVisibleHandler} isVisible={isFormVisible} />
    </React.Fragment>
  )
}
export {SearchForm}
