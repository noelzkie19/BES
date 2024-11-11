import React, {useContext, useEffect, useState} from 'react'
import {yupResolver} from '@hookform/resolvers/yup'
import {Controller, useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import {Resource} from '../models/resource-model'
import {resourceFormValidationSchema} from '../validators/resource-form'
import {createResource, deleteResource, updateResource} from '../api'
import {ResourceContext} from '../context/ResourceContext'
import {CustomAlert, IAlert} from '../../../shared/components/CustomAlert'
import {NumericTextBox} from '@progress/kendo-react-inputs'
import {RESOURCE_FORM_DEFAULT} from '../constant/resource-default'
import {ErrorMessage} from '@hookform/error-message'
import { DeleteButton } from '../../../../_metronic/partials/content/button/action/DeleteButton'

interface IProps {
  resourcesData?: Resource
}

const ResourceForm: React.FC<IProps> = ({resourcesData}) => {

  const history = useHistory()
  const [customAlert, setCustomAlert] = useState<IAlert | undefined>()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: resourcesData,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(resourceFormValidationSchema),
  })

  const onSubmit = async (values: Resource) => {
    const payload: Resource = values
    if (!resourcesData) {
      createResource(payload)
        .then(() => {
          setCustomAlert({
            message: `Resource added successfully.`,
            header: `Resource Add`,
            type: 'primary',
          })
        })
        .catch((err) => {
          setCustomAlert({
            message: err.response.data ? err.response.data : 'Error saving',
            header: `Error Saving User`,
            type: 'danger',
          })
        })
    }
    if (resourcesData) {
      updateResource(payload)
        .then(() => {
          setCustomAlert({
            message: `Resource edited successfully.`,
            header: `Resource Edit`,
            type: 'primary',
          })
        })
        .catch((err) => {
          setCustomAlert({
            message: err.response.data ? err.response.data.title : 'Error saving',
            header: `Error Edit Resource`,
            type: 'danger',
          })
        })
    }
  }
  const onReset = async () => {
    reset(RESOURCE_FORM_DEFAULT)
  }
  return (
      <React.Fragment>
      {customAlert && <CustomAlert {...customAlert} />}
      <form onSubmit={handleSubmit(onSubmit)} name='resource' onReset={onReset}>
        <div className='modal-body'>
          <div className='d-flex actions'>
            <button type='reset' className='btn btn-primary col-auto me-auto'>
              Clear
            </button>
            {(resourcesData?.id || 0) > 0 && (
                <DeleteButton title={`Delete Resources ${resourcesData?.name}`}
                  modalMessage={'You are deleting a Resources, Continue?'}
                  className={'me-5'}
                  disabled={false}
                  deleteHandler={() => {
                    if (resourcesData) {
                      deleteResource(resourcesData).then(() => {
                        history.push('/resource/list')
                      })
                    }
                  }}></DeleteButton>
              )} 
            <button
              type='submit'
              className='btn btn-outline-primary col-auto me-4'
              onClick={() => {
                history.push('/resource/list')
              }}
            >
              Back
            </button>
            <button type='submit' className='btn btn-primary col-auto'>
              Save
            </button>
          </div>
        </div>
        <div className='row align-items-center mt-6 pe-2'>
          <div className='col-lg-3 col-md-3 col-12 mb-4'>
            <label className='form-label' htmlFor=''>
              Name
            </label>
            <input
              type='text'
              className={`form-control${errors.name ? ' border-danger' : ''}`}
              {...register('name')}
            />
            <ErrorMessage
              errors={errors}
              name='hourlyRate'
              as={<span className='spanRequired' />}
            />
          </div>
          <div className='col-lg-9 col-md-3 col-12 mb-4'>
            <label className='form-label' htmlFor=''>
              Description
            </label>
            <input
              type='text'
              className={`form-control${errors.description ? ' border-danger' : ''}`}
              {...register('description')}
            />
            <ErrorMessage
              errors={errors}
              name='hourlyRate'
              as={<span className='spanRequired' />}
            />
          </div>
        </div>

        <div className='row align-items-end mt-6 pe-2'>
          <div className='col-lg-3 col-md-3 col-12 mb-4'>
            <label className='form-label' htmlFor=''>
              Hourly Rate
            </label>
            <Controller
              control={control}
              name='hourlyRate'
              render={({field: {value, name, onChange}}) => {
                return (
                  <NumericTextBox
                    name={name}
                    width='100%'
                    onChange={onChange}
                    value={value}
                    defaultValue={0}
                    format='c2'
                    min={0}
                    className={`hourlyRate form-control${
                      errors.hourlyRate ? ' border-danger' : ''
                    }`}
                  />
                )
              }}
            />
            <ErrorMessage
              errors={errors}
              name='hourlyRate'
              as={<span className='spanRequired' />}
            />
          </div>
          <div className='col-lg-3 col-md-3 col-12  mb-auto mt-11'>
            <div className='form-check'>
              <label className='form-check-label'>
                <input type='checkbox' {...register('isActive')} className='form-check-input' />
                Active
              </label>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  )
}

export {ResourceForm}
