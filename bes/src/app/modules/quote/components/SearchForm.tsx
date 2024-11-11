import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import IsFormVisible from './IsFormVisible'
import { IQuoteSearch } from '../models/quote-model'
import { DatePicker } from '@progress/kendo-react-dateinputs'


interface IProps {
    onSearchHandle: (search: IQuoteSearch) => void
}

const SearchForm: FC<IProps> = ({ onSearchHandle }) => {
    const [isFormVisible, setIsFormVisible] = useState(false)

    const isFormVisibleHandler = () => {
        setIsFormVisible((current) => !current)
    }
    const { register, handleSubmit } = useForm({
        reValidateMode: 'onSubmit',
    })

    const onSubmit = (value: IQuoteSearch) => {
        onSearchHandle(value)
    }
    const value = new Date();
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)} name='quote'>
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
                            <div className='row mb-4'>
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
                                        placeholder='Description'
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
                                        placeholder='Order'
                                    />
                                </div>
                                <div className='d-flex col-lg-2 col-md-2 col-6'>
                                    <select className={`form-control`}
                                        {...register('jobId')}
                                    // value={jobVal}
                                    // onChange={handleJobChange}
                                    >
                                        {/* {jobOptions.map((element, index) =>  */}
                                        <option value="1">Type 1</option>
                                        <option value="2">Type 2</option>
                                        <option value="3">Type 3</option>
                                        <option value="4">Type 4</option>
                                    </select>
                                </div>
                                <div className='d-flex col-lg-2 col-md-2 col-6'>
                                    <input
                                        type='text'
                                        id='kt_filter_search'
                                        className='form-control form-control-white'
                                        placeholder='Client'
                                    />
                                </div>
                            </div>
                            <div className='row mb-4'>
                                <div className='d-flex col-lg-2 col-md-2 col-6'>
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault" style={{marginLeft: '10px'}}>
                                        Delivered
                                    </label>

                                </div>
                                <div className='d-flex col-lg-2 col-md-2 col-6'>
                                     <DatePicker defaultValue={value} defaultShow={true} />
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
export { SearchForm }
