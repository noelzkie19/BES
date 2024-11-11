import {yupResolver} from '@hookform/resolvers/yup'
import React, {useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'

import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { ISupplierContact } from '../../models/supplier-model';
import { SUPPLIER_CONTACT_DEFAULT } from '../../constant/supplier-defaults';
import { contactFormValidationSchema } from '../../validators/supplier-form';
import PhoneInput from 'react-phone-input-2';

type Props = {
  handleClose: () => void
  onSuccess?: (values: ISupplierContact, dataIndex: number) => void
  contactValue?: ISupplierContact
  dataIndex: number
}

const ContactForm: React.FC<Props> = ({handleClose, onSuccess, contactValue, dataIndex}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
    getValues,
    control
  } = useForm({
    defaultValues: contactValue ? {...contactValue} : SUPPLIER_CONTACT_DEFAULT,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(contactFormValidationSchema),
  })

  useEffect(() => {
    if (contactValue) {
      reset({...contactValue})
    } else {
      reset(SUPPLIER_CONTACT_DEFAULT)
    }
  }, [contactValue, reset])

  const onSubmit = async () => {
    if (onSuccess) onSuccess(getValues(), dataIndex)
  }
  const onReset = async () => {
    reset(SUPPLIER_CONTACT_DEFAULT)
  }

  return (
      <Dialog title={"Contact Form"} onClose={handleClose} 
        width='90vw'
        height='80vh'>
          <form onSubmit={handleSubmit(onSubmit)} onReset={onReset} name='contactName'>
        <div className='modal-body'>
          <div className='col col-12 pe-2  mb-4'>
            <div className='col col-12'>
              <label className='form-label' htmlFor='contactName'>
                Contact Name
              </label>
              <input
                type='text'
                className={`form-control${errors.contactName ? ' border-danger' : ''}`}
                {...register('contactName')}
              />
            </div>
          </div>

          <div className='col col-12 pe-2  mb-4'>
            <div className='col col-12'>
              <label className='form-label' htmlFor='position'>
                Position
              </label>
              <input
                type='text'
                className={`form-control${errors.position ? ' border-danger' : ''}`}
                {...register('position')}
              />
            </div>
          </div>

          <div className='col col-12 pe-2  mb-4'>
            <label className='form-label' htmlFor='phone'>
              Phone
            </label>
            <Controller
                control={control}
                name='phone'
                render={({field: {value, onChange}}) => {
                  return (
                    <PhoneInput
                    inputStyle={{width: '100%'}}
                    placeholder="Enter phone number"
                    value={value}
                    onlyCountries={["au"]}
                    country={'au'}
                    onChange={onChange}/>
                  )
                }}
              />
            {/* <input
              type='text'
              className={`form-control${errors.phone ? ' border-danger' : ''}`}
              {...register('phone')}
            /> */}
          </div>
          <div className='col col-12 pe-2  mb-4'>
            <label className='form-label' htmlFor='mobile'>
              Mobile
            </label>
            <input
              type='text'
              className={`form-control${errors.mobile ? ' border-danger' : ''}`}
              {...register('mobile')}
            />
          </div>
          <div className='col col-12 pe-2  mb-4'>
            <label className='form-label' htmlFor='email'>
              Email
            </label>
            <input
              type='text'
              className={`form-control${errors.email ? ' border-danger' : ''}`}
              {...register('email')}
            />
          </div>
          <div className='col col-12 pe-2  mb-4'>
            <label className='form-label' htmlFor='notes'>
              Notes
            </label>
            <textarea
              className={`form-control${errors.notes ? ' border-danger' : ''}`}
              style={{height: '160px'}}
              {...register('notes')}
            />
          </div>
        </div>
      </form>
      <DialogActionsBar>
        <button
          className="btn btn-primary"
          onClick={onSubmit}
        >
          Proceed
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={handleClose}
        >
          No
        </button>
      </DialogActionsBar>
    </Dialog>
  )
}

export {ContactForm}
