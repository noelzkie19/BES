import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { ISupplierSearch } from '../models/supplier-model'

interface IProps {
    onSearchHandle: (search: ISupplierSearch) => void
}

const SearchForm: FC<IProps> = ({ onSearchHandle }) => {
    const { register, handleSubmit } = useForm({
        reValidateMode: 'onSubmit',
    })

    const onSubmit = (value: ISupplierSearch) => {
        onSearchHandle(value)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} name='contactName'>
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
                <div className='d-flex col-lg-2 col-md-2 col-6'>
                    <input
                        type='text'
                        id='kt_filter_search'
                        className='form-control form-control-white'
                        placeholder='Supplier Id'
                        {...register('supplierId')}
                    />
                </div>
                <div className='d-flex col-lg-2 col-md-2 col-6'>
                    <input
                        type='text'
                        id='kt_filter_search'
                        className='form-control form-control-white'
                        placeholder='Supplier Name'
                        {...register('supplierName')}
                    />
                </div>
                <div className='d-flex col-lg-2 col-md-2 col-6'>
                    <input
                        type='text'
                        id='kt_filter_search'
                        className='form-control form-control-white'
                        placeholder='Suburb'
                        {...register('suburb')}
                    />
                </div>
                <div className='d-flex col-lg-2 col-md-2 col-6'>
                    <input
                        type='text'
                        id='kt_filter_search'
                        className='form-control form-control-white'
                        placeholder='Postcode'
                        {...register('postalCode')}
                    />
                </div>
                <div className='d-flex col-lg-2 col-md-2 col-6'>
                    <input
                        type='text'
                        id='kt_filter_search'
                        className='form-control form-control-white'
                        placeholder='Phone'
                        {...register('phone')}
                    />
                </div>
                <div className='d-flex col-lg-2 col-md-2 col-6'>
                    <input
                        type='text'
                        id='kt_filter_search'
                        className='form-control form-control-white'
                        placeholder='Contact Person'
                        {...register('contactPerson')}
                    />
                </div>
            </div>
        </form>
    )
}

export { SearchForm }
