import {FC} from 'react'
import {useForm} from 'react-hook-form'
import {KTSVG} from '../../../../_metronic/helpers/components/KTSVG'
import {IUserSearch} from '../models/user-model'

interface IProps {
  onSearchHandle: (search: IUserSearch) => void
}

const SearchForm: FC<IProps> = ({onSearchHandle}) => {
  const {register, handleSubmit} = useForm({
    reValidateMode: 'onSubmit',
  })

  const onSubmit = (value: IUserSearch) => {
    onSearchHandle(value)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} name='userName'>
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
              className='form-control form-control-white ps-9 form-search'
              placeholder='Search'
              {...register('search')}
            />
            <button className='btn btn-primary col-auto btn-search'>Search</button>
          </div>
        </div>
        <div className='d-flex col-lg-2 col-md-2 col-6'>
          <input
            type='text'
            id='kt_filter_search'
            className='form-control form-control-white'
            placeholder='User Id'
            {...register('userId')}
          />
        </div>
        <div className='d-flex col-lg-2 col-md-2 col-6'>
          <input
            type='text'
            id='kt_filter_search'
            className='form-control form-control-white'
            placeholder='User Name'
            {...register('userName')}
          />
        </div>
        <div className='d-flex col-lg-2 col-md-2 col-6'>
          <input
            type='text'
            id='kt_filter_search'
            className='form-control form-control-white'
            placeholder='First Name'
            {...register('firstName')}
          />
        </div>
        <div className='d-flex col-lg-2 col-md-2 col-6'>
          <input
            type='text'
            id='kt_filter_search'
            className='form-control form-control-white'
            placeholder='Last Name'
            {...register('lastName')}
          />
        </div>
        <div className='d-flex col-lg-2 col-md-2 col-6'>
          {/* <select
            id='kt_filter_search'
            className='form-control form-control-white'
            {...register('status')}
          >
            {(USER_STATUS || []).map((item, i) => {
              return (
                <option key={i} value={item.value}>
                  {item.label}
                </option>
              )
            })}
          </select> */}
          <input
            type='text'
            id='kt_filter_search'
            className='form-control form-control-white'
            placeholder='Status'
            {...register('status')}
          />
        </div>
      </div>
    </form>
  )
}

export {SearchForm}
