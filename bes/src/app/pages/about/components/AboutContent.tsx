import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {Link} from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import { bool } from 'yup'
import { usePageData } from '../../../../_metronic/layout/core'
import { CustomAlert, IAlert } from '../../../shared/components/CustomAlert'
import { getAbouts, updateAbout } from '../api'
import { INITIAL_DEFAULT } from '../constant/about-constant'
import { IAbout } from '../model/about'
import { aboutFormValidationSchema } from '../validators/about-form'

const AboutContent: React.FC = () => {
  const { currentUser } = usePageData()
  const [isCanEdit, setCanEdit] = useState<boolean>(true)
  const [toaster, setToaster] = useState<IAlert | undefined>()
  
  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    reset,
    getValues
  } = useForm({
    defaultValues: INITIAL_DEFAULT,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(aboutFormValidationSchema),
  })

  useEffectOnce(() => {
    getAboutDetails()
  })

  const getAboutDetails = async () => {
    const [data]: any = await getAbouts();
    if (!data) return
    reset({...data.data})
  }

  useEffect(() => {
    if (currentUser) {
      const idx = (currentUser.userRoles || []).findIndex(x => x === 'Administrator')
      setCanEdit(idx >= 0)
    }
  }, [currentUser])

  const toasterClose = () => {
    setToaster(undefined)
  }

  const onSubmit = async (about: IAbout) => {
    const data = await updateAbout(about);
    if (data) {
      setToaster({
        message: 'Company Details save successfully.',
        header: `Company Details`,
        type: 'primary',
        closeToaster: toasterClose
      })
    }
  }


  return (
    <React.Fragment>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-body p-9'>
          {toaster && <CustomAlert {...toaster} />}
          <form onSubmit={handleSubmit(onSubmit)} className='form'>
                
            <div className='card-header cursor-pointer'>
              <div className='card-title m-0'>
                <h3 className='fw-bolder m-0'>Company Details</h3>
              </div>
              {
                 isCanEdit && (
                  <button type='submit' 
                    className='btn btn-primary align-self-center'>
                      Save
                  </button>
                 )
              }
           
            </div>

            <div className='row align-items-center mt-6 pe-2'>
              <div className='col-12 mb-4'>
                <label className='form-label' htmlFor=''>
                    Address
                </label>
                <input type='text' 
                  className={`form-control${errors.address ? ' border-danger' : ''}`}
                  {...register('address')}
                  disabled={!isCanEdit}/>
              </div>
            </div>

            <div className='row align-items-center mt-6 pe-2'>
              <div className='col-6 mb-4'>
                <label className='form-label' htmlFor=''>
                 Phone
                </label>
                <input type='text' 
                  className={`form-control${errors.phone ? ' border-danger' : ''}`}
                  {...register('phone')}
                  disabled={!isCanEdit}/>
              </div>
              <div className='col-6 mb-4'>
                <label className='form-label' htmlFor=''>
                Email
                </label>
                <input type='text' 
                  className={`form-control${errors.email ? ' border-danger' : ''}`}
                  {...register('email')}
                  disabled={!isCanEdit}/>
              </div>
            </div>
            <div className='row align-items-center mt-6 pe-2'>
              <div className='col-6 mb-4'>
                <label className='form-label' htmlFor=''>
                Web
                </label>
                <input type='text' 
                  className={`form-control${errors.website ? ' border-danger' : ''}`}
                  {...register('website')}
                  disabled={!isCanEdit}/>
              </div>
              <div className='col-6 mb-4'>
                <label className='form-label' htmlFor=''>
                ABN
                </label>
                <input type='text' 
                  className={`form-control${errors.abn ? ' border-danger' : ''}`}
                  {...register('abn')}
                  disabled={!isCanEdit}/>
              </div>
            </div>

          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export { AboutContent }