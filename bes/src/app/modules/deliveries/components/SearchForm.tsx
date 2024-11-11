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
            <div className='row mb-4'>
              <div className='d-flex col-lg-2 col-md-2 col-6'>
                <input
                  type='text'
                  id='kt_filter_search'
                  className='form-control form-control-white'
                  placeholder='Delivery No.'
                />
              </div>

              <div className='d-flex col-lg-2 col-md-2 col-6'>
                <input
                  type='text'
                  id='kt_filter_search'
                  className='form-control form-control-white'
                  placeholder='Client'
                />
              </div>

              <div className='d-flex col-lg-2 col-md-2 col-6'>
                <input
                  type='text'
                  id='kt_filter_search'
                  className='form-control form-control-white'
                  placeholder='Order'
                />
              </div>
              <div className='d-flex col-lg-2 col-md-2 col-6'>
                <input
                  type='text'
                  id='kt_filter_search'
                  className='form-control form-control-white'
                  placeholder='Drawing'
                />
              </div>
              <div className='d-flex col-lg-2 col-md-2 col-6'>
                <input
                  type='text'
                  id='kt_filter_search'
                  className='form-control form-control-white'
                  placeholder='Description'
                />
              </div>
              <div className='d-flex col-lg-2 col-md-2 col-6'>
                <input
                  type='text'
                  id='kt_filter_search'
                  className='form-control form-control-white'
                  placeholder='Job'
                />
              </div>
              <div className='d-flex col-lg-2 col-md-2 col-6'>
                <div className='checkbox-list mb-3 d-flex align-items-buttom'>
                  <label className='checkbox mt-5'>
                    <input type='checkbox' /> <span>Delivered</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
      <IsFormVisible isClick={isFormVisibleHandler} isVisible={isFormVisible} />
    </React.Fragment>
  )
}
export {SearchForm}
