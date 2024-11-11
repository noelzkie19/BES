import React, {FC, useState} from 'react'
import {useForm} from 'react-hook-form'
import {KTSVG} from '../../../../_metronic/helpers/components/KTSVG'
import {IStockSearch} from '../models/stock-model'
import IsFormVisible from './IsFormVisible'

interface IProps {
  onSearchHandle: (search: IStockSearch) => void
}

const SearchForm: FC<IProps> = ({onSearchHandle}) => {
  const {register, handleSubmit} = useForm({
    reValidateMode: 'onSubmit',
  })

  const onSubmit = (value: IStockSearch) => {
    onSearchHandle(value)
  }
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)} name='stockName'>
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
                {...register('search')}
              />
              <button className='btn btn-primary col-auto btn-search'>Search</button>
            </div>
          </div>
            <div className='row mb-4'>
              <div className='d-flex col-lg-2 col-md-2 col-6'>
                <input
                  type='text'
                  id='kt_filter_search'
                  className='form-control form-control-white'
                  placeholder='Client Name'
                  {...register('clientName')}
                />
              </div>

              <div className='d-flex col-lg-2 col-md-2 col-6'>
                <input
                  type='text'
                  id='kt_filter_search'
                  className='form-control form-control-white'
                  placeholder='Description'
                  {...register('description')}
                />
              </div>

              <div className='d-flex col-lg-2 col-md-2 col-6'>
                <input
                  type='text'
                  id='kt_filter_search'
                  className='form-control form-control-white'
                  placeholder='Drawing'
                  {...register('drawing')}
                />
              </div>
              <div className='d-flex col-lg-2 col-md-2 col-6'>
                <input
                  type='text'
                  id='kt_filter_search'
                  className='form-control form-control-white'
                  placeholder='Revision'
                  {...register('revision')}
                />
              </div>
            </div>
        </div>
      </form>
    </React.Fragment>
  )
}
export {SearchForm}
