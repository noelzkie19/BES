
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { IStocks, IJob } from '../models/stock-model'
import { stockFormValidationSchema } from '../validators/stock-form'
import { createStock, updateStock, getClients, getJobs, deleteStock } from '../api'
import { CustomAlert, IAlert } from '../../../shared/components/CustomAlert'
import { STOCK_FORM_DEFAULT } from '../constant/stock-default'
import { useEffectOnce } from 'react-use'
import { IClient } from '../../clients/models/client-model'
import { GridSetup } from '../../users/models/user-model'
import { Initial_GridSetup } from '../../clients/constant/config-defaults'
import Select from 'react-select'
import { transformDataClient, transformDataJobs } from '../transformer/stock-transformer'
import { DeleteButton } from '../../../../_metronic/partials/content/button/action/DeleteButton'

interface IProps {
  stocksData?: IStocks,
}

const StockForm: React.FC<IProps> = ({ stocksData }) => {
  const [customAlert, setCustomAlert] = useState<IAlert | undefined>()
  const history = useHistory()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: stocksData,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(stockFormValidationSchema),
  })

  useEffectOnce(() => {
    doFetchClientData()
    return () => {
      setclientVal(0)
      setJobVal(null)
    };
  })

  const doFetchClientData = () => {
    fetchClientData();
  }

  const [clientOptions, setClientOptions] = useState<IClient[]>([]);
  const [jobOptions, setJobOptions] = useState<IJob[]>([]);
  const [clientVal, setclientVal] = useState(0);
  const [jobVal, setJobVal] = useState(null);

  const clientNameVal = useWatch({
    control,
    name: 'clientId'
  })

  const fetchClientData = async () => {
    await getClients().then((response: any) => {
      setClientOptions(response.data);
      response.data.forEach((element: any) => {
      });
      if (stocksData) {
        let obj: any = stocksData;
        setclientVal(obj.clientId)
        setJobVal(obj.jobId)
      }
    }).catch(() => {
      alert("error");
    })
  }

  useEffect(() => {
    setValue('jobId', null)
    fetchJobData(clientNameVal)
  }, [clientNameVal])

  const fetchJobData = async (clientId: any) => {

    const jobs = await getJobs(clientId);
    if (jobs.length == 0) {
      setJobOptions([]);
    }
    else {
      setJobOptions(jobs);
    }
  }

  useEffect(() => {
    if (stocksData) {
      reset({
        ...stocksData,
      })
    } else {
      reset(STOCK_FORM_DEFAULT)
    }
  }, [stocksData, reset, setCustomAlert])

  const onSubmit = async (values: IStocks) => {
    const payload: IStocks = values
    if (payload.jobId == 0 || payload.jobId == null) {
      setCustomAlert({
        message: 'Error saving Please Select JobNumber',
        header: `Error Saving User`,
        type: 'danger',
      })
    }
    if (payload.clientId == 0 || payload.clientId == null) {
      setCustomAlert({
        message: 'Error saving Please Select Client Name',
        header: `Error Saving User`,
        type: 'danger',
      })
    }

    setIsSaving(true)
    if (!stocksData) {
      createStock(payload)
        .then((response: any) => {
          setIsSaving(false)
          history.push({
            pathname: '/stock/edit',
            search: `?id=${response}`
          });
        })
        .catch((err) => {
          setCustomAlert({
            message: err.response.data ? err.response.data : 'Error saving',
            header: `Error Saving User`,
            type: 'danger',
          })
          setIsSaving(false)
        })
    } if (stocksData) {
      updateStock(payload)
        .then(() => {
          setCustomAlert({
            message: `Stock edited successfully.`,
            header: `Stock Edit`,
            type: 'primary',
          })
          setIsSaving(false)
        })
        .catch((err) => {
          setCustomAlert({
            message: err.response.data ? err.response.data.title : 'Error saving',
            header: `Error Edit Stock`,
            type: 'danger',
          })
          setIsSaving(false)
        })
    }
  }
  const onReset = () => {
    reset(STOCK_FORM_DEFAULT)
  }

  return (
    <React.Fragment>
      {customAlert && <CustomAlert {...customAlert} />}
      <form onSubmit={handleSubmit(onSubmit)} onReset={onReset} name='stock'>
        <div className='modal-body'>
          <div className='d-flex actions'>
         
            <button type='reset' className='btn btn-primary col-auto me-auto'>
              Clear
            </button>
            {(stocksData?.id || 0) > 0 && (
              <DeleteButton title={`Delete stock ${stocksData?.id}`}
                modalMessage={'You are deleting a stock, Continue?'}
                className={'me-4'}
                disabled={false}
                deleteHandler={() => {
                  if (stocksData) {
                    deleteStock(stocksData).then(() => {
                      history.push('/stock/list')
                    })
                  }
                }}></DeleteButton>
            )}   
            <button
              type='submit'
              className='btn btn-outline-primary col-auto me-4'
              onClick={() => {
                history.push('/stock/list')
              }}
            >
              Back
            </button>
            <button type='submit' className='btn btn-primary col-auto' disabled={isSaving}>
              Save
            </button>
           
          </div>
        </div>
        <div className='row align-items-end mt-6'>
          <div className='col-lg-3 col-md-3 col-12 mb-4'>
            <label className='form-label' htmlFor='clientName'>
              Client Name
            </label>
            {/* <select className={`form-control`} value={clientVal} onChange={handleClientChange}>
              {clientOptions.map((element, index) => <option value={element.id}>{element.name}</option>)}
            </select> */}
            <Controller
              control={control}
              name='clientId'
              render={({ field: { value, name, onChange } }) => {
                return (
                  <Select
                    options={transformDataClient(clientOptions)}
                    onChange={(event: any) => { onChange(event.value) }}
                    className={`controllerSelect${errors.id ? ' border-danger' : ''}`}
                    name={name}
                    value={transformDataClient(clientOptions).find((cl: any) => cl.value === value) || ''}
                    tabIndex={1}
                    autoFocus
                  ></Select>
                )
              }}
            />
          </div>
          <div className='col-lg-9 col-md-9 col-12 mb-4'>
            <label className='form-label' htmlFor='description'>
              Description
            </label>
            <input type='text'
              className={`form-control${errors.description ? ' border-danger' : ''}`}
              {...register('description')}
              tabIndex={2}
            />
          </div>
        </div>
        <div className='row align-items-end mt-6'>
          <div className='col-lg-3 col-md-3 col-12 mb-4'>
            <label className='form-label' htmlFor='drawing'>
              Drawing
            </label>
            <input type='text'
              className={`form-control${errors.drawing ? ' border-danger' : ''}`}
              {...register('drawing')}
              tabIndex={3}
            />
          </div>
          <div className='col-lg-3 col-md-3 col-12 mb-4'>
            <label className='form-label' htmlFor='revision'>
              Revision
            </label>
            <input type='text'
              className={`form-control${errors.revision ? ' border-danger' : ''}`}
              {...register('revision')}
              tabIndex={4}
            />
          </div>
          <div className='col-lg-3 col-md-3 col-12 mb-4'>
            <label className='form-label' htmlFor='quantity'>
              Quantity
            </label>
            <input type='number' min="0"
              className={`form-control${errors.quantity ? ' border-danger' : ''}`}
              {...register('quantity')}
              tabIndex={5}
            />
          </div>
          <div className='col-lg-3 col-md-3 col-12 mb-4'>
            <label className='form-label' htmlFor='job'>
              Source / Destination Job No.
            </label>
            <Controller
              control={control}
              name='jobId'
              render={({ field: { name, value, onChange } }) => {
                return (
                  <Select
                    options={transformDataJobs(jobOptions)}
                    onChange={(event: any) => { onChange(event.value); setJobVal(event.value) }}
                    className={`controllerSelect${errors.jobId ? ' border-danger' : ''}`}
                    name={name}
                    value={transformDataJobs(jobOptions).find((jb: any) => jb.value === value) || ''}
                    tabIndex={6}
                  ></Select>
                )
              }}
            />
          </div>
        </div>
        <div className='row align-items-end mt-6'>
          <div className='col-12 mb-4'>
            <label className='form-label' htmlFor='job'>
              Notes
            </label>
            <textarea
              className={`form-control${errors.notes ? ' border-danger' : ''}`}
              {...register('notes')}
              tabIndex={7}
            ></textarea>
          </div>
        </div>
      </form>
    </React.Fragment>
  )
}

export { StockForm }
