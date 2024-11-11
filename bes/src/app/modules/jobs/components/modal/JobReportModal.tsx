import React, { useState } from 'react'
import * as ReactDOM from 'react-dom'
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'
import { DatePicker } from '@progress/kendo-react-dateinputs'
import '@progress/kendo-theme-material/dist/all.css'
import { IClient } from '../../../clients/models/client-model'
import { useEffectOnce } from 'react-use'
import { getClients } from '../../../stocks/api'
import { getAllJobTypes, getJobReportPrint } from "../../api";
import { Controller, useForm } from 'react-hook-form'
import { JOB_REPORT_PRINT_FILTER } from '../../constant/config-default'
import { IJobReport, IJobReportPrintFilter } from '../../models/job-model'
import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import { printFormValidationSchema } from '../../validators/job-form'

interface IProps {
  title: string
  toggleDialog: () => void
  onPrint: (printDetails: IJobReport[]) => void
}

const BATCH_ROW = 1000;

const JobReportModal: React.FC<IProps> = ({ title, toggleDialog, onPrint }) => {
  const [clientOptions, setClientOptions] = useState<IClient[]>([]);
  const [jobTypes, setJobTypes] = useState<[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffectOnce(() => {
    getAllJobTypes().then((data) => {
      setJobTypes(data.data)
    })
    getClients().then((response: any) => {
      setClientOptions(response.data);
    }).catch(() => {
      alert("error");
    })
  });


  const { register, control, handleSubmit, watch, setValue,
    formState: {errors} } = useForm({
    defaultValues: JOB_REPORT_PRINT_FILTER,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(printFormValidationSchema),
  })
  const onSubmit = async (filterValue: IJobReportPrintFilter) => {
    let printData: any = [];
    let row = 0;
    let done = false;
    setIsLoading(true)

    while (!done) {
      const [result]: any = await getJobReportPrint(filterValue)
      if (result) {
        const { items, totalCount } = result.data;
        printData = [...printData, ...items]
        let que = Math.ceil(totalCount / BATCH_ROW) - 1;
        done = row >= que
      } 
      row++;
      filterValue = {
        ...filterValue,
        skip: row * BATCH_ROW
      }
    }
   
    setIsLoading(false)
    onPrint(printData);
  }

  return (
    <Dialog title={title} onClose={toggleDialog}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='modal-body'>
          {/* <div className='row mb-4'>
            <div className='col col-md-6 pe-2  mb-4'>
              <label className='form-label' htmlFor=''>
                From
              </label>
              <Controller
                control={control}
                name="from"
                render={({ field: { value, name, onChange } }) => {
                  const date = value ? new Date(value || '') : null
                  return <DatePicker
                    format="dd/MM/yyyy"
                    name={name}
                    value={date}
                    onChange={onChange}
                  />
                }} />
            </div>
            <div className='col col-md-6 pe-2  mb-4'>
              <label className='form-label' htmlFor=''>
                To
              </label>
              <Controller
                control={control}
                name="to"
                render={({ field: { value, name, onChange } }) => {
                  const date = value ? new Date(value || '') : null
                  return <DatePicker
                    format="dd/MM/yyyy"
                    name={name}
                    value={date}
                    onChange={onChange}
                  />
                }} />
                <div>
                  <ErrorMessage errors={errors} name='to' as={<span className='spanError' />} />
              </div>
            </div>
          </div> */}
          <div className='row mb-4'>
            <div className='col col-md-12 pe-2  mb-4'>
              <label className='form-label' htmlFor=''>
                Customers
              </label>
              <div className='row'>
                <div className='col-md-2 m-auto'>
                  <div className='checkbox-list'>
                    <label className='checkbox me-5'>
                      <input type='checkbox'
                        className='form-check-input'
                        {...register('isAllClient', {
                          onChange: (event) => {
                            if (event.target.value) {
                              setValue('client', 0)
                            }
                          }
                        })}
                      />{' '}
                      <span>All</span>
                    </label>
                  </div>
                </div>
                <div className='col-md-10'>
                  <select className={`form-control`}
                    {...register(`client`)}
                    disabled={watch("isAllClient")}>
                    <option value={0}>Select Customer</option>
                    {(clientOptions || []).map((item, idx) => {
                      return (
                        <option key={idx} value={item.id}>
                          {item.name}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-4'>
            <div className='col col-md-12 pe-2  mb-4'>
              <label className='form-label' htmlFor=''>
                Job Type
              </label>
              <div className='row'>
                <div className='col-md-2 m-auto'>
                  <div className='checkbox-list'>
                    <label className='checkbox me-5'>
                      <input type='checkbox'
                        className='form-check-input'
                        {...register('isAllJobType', {
                          onChange: (event) => {
                            if (event.target.value) {
                              setValue('jobType', 0)
                            }
                          }
                        })}
                      />{' '}
                      <span>All</span>
                    </label>
                  </div>
                </div>
                <div className='col-md-10'>
                  <select className={`form-control`}
                    {...register(`jobType`)}
                    disabled={watch("isAllJobType")}>
                    <option value={0}>Select Job Type</option>
                    {(jobTypes || []).map((item: any, idx) => {
                      return (
                        <option key={idx} value={item.id}>
                          {item.description}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-4'>
            <div className='col col-md-12 pe-2  mb-4'>
              <label className='form-label' htmlFor=''>
                Sort By{' '}
              </label>
              <div className='checkbox-list mb-3 d-flex align-items-buttom'>
                <label className='checkbox me-5'>
                  <input type='radio'
                    value="Job.Id"
                    {...register('by')}
                  /> <span>Job Number</span>
                </label>
                <label className='checkbox  me-5'>
                  <input type='radio'
                    value="Client.Name"
                    {...register('by')}
                  /> <span>Customer Name</span>
                </label>
                <label className='checkbox'>
                  <input type='radio'
                    value="Job.Created"
                    {...register('by')}
                  /> <span>Date</span>
                </label>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col col-md-12 pe-2  mb-4'>
              <label className='form-label' htmlFor=''>
                Order By{' '}
              </label>
              <div className='checkbox-list mb-3 d-flex align-items-buttom'>
                <label className='checkbox me-5'>
                  <input type='radio'
                    value="asc"
                    {...register('sortBy')}
                  /> <span>Ascending</span>
                </label>
                <label className='checkbox  me-5'>
                  <input type='radio'
                    value="desc"
                    {...register('sortBy')}
                  /> <span>Descending</span>
                </label>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col col-md-12 pe-2  mb-4'>
              <label className='form-label' htmlFor=''>
                Show To Be Invoiced Only{' '}
              </label>
              <div className='checkbox-list mb-3 d-flex align-items-buttom'>
                <input type='checkbox'
                      className='form-check-input'
                      {...register('toBeInvoice')}
                    />{' '}
              </div>
            </div>
          </div>
        </div>
        <DialogActionsBar>
          <button className='btn btn-primary submit' disabled={isLoading}>
            {isLoading ? 'Please wait' : 'Print'}
            
          </button>
          <button className='btn btn-outline-primary' onClick={toggleDialog}>Close</button>
        </DialogActionsBar>
      </form>

    </Dialog>
  )
}

export default JobReportModal
