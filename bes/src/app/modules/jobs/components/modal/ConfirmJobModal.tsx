import React, {FC, useEffect, useState} from 'react'
import {Dialog, DialogActionsBar} from '@progress/kendo-react-dialogs'
import { useForm } from 'react-hook-form'
import { IEditData } from '../../models/job-model'
import { JOB_FORM_DEFAULT } from '../../constant/job-default'

interface IProps {
  jobData?: IEditData | null
  title: string
  proceedConfirm: (jobData: IEditData) => void
  toggleDialog: () => void
  onPrint: () => void
  onSend: () => void
}

const ConfirmJobModal: FC<IProps> = ({ title, toggleDialog, onPrint, jobData, proceedConfirm, onSend }) => {
  const [confirmed, setConfirmed] = useState<boolean>(false)

  const {
    handleSubmit,
    register,
    setValue
  } = useForm({
    defaultValues: jobData || JOB_FORM_DEFAULT,
    reValidateMode: 'onSubmit',
  })

  const onSubmit = (values: any) => {
    proceedConfirm(values)
    onPrint()
  }

  useEffect(() => {
    if (jobData) {
      setConfirmed(jobData.isByHour || jobData.isQoutedJob)
      if (!jobData.isByHour && !jobData.isQoutedJob && jobData.quoteNumberSource)
        setValue('isQoutedJob', true)
    }
  }, [jobData])

  const onPrintHandler = (e: any) => {
    e.preventDefault()
    onPrint()
  }

  const confirmJobHandler = (e: any) => {
    e.preventDefault()
    setConfirmed(true)
  }

  return (
    <Dialog title={title} onClose={toggleDialog} width={650}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row'>
          <div className='my-2 col-lg-6 col-md-6 col-12 mb-5'>
            <label className='form-label' htmlFor='from'>
              Quoted Job
            </label>
            <div className='form-check'>
              <input type='checkbox' className='form-check-input' 
                {...register('isQoutedJob')}/>
              <label className='form-check-label' />
            </div>
          </div>
          <div className='my-2 col-lg-6 col-md-6 col-12 mb-5'>
            <label className='form-label' htmlFor='from'>
              By The hour
            </label>
            <div className='form-check'>
              <input type='checkbox' className='form-check-input' 
                {...register('isByHour')}/>
              <label className='form-check-label' />
            </div>
          </div>
        </div>

        <DialogActionsBar>
          
          {confirmed ? (
            <React.Fragment>
              {/* <button type='submit' 
                className='btn btn-primary'>Proceed</button> */}
              <button type='submit' className='btn btn-primary' >
                Print
              </button>
              <button type='button' className='btn btn-primary'
                onClick={onSend}>
                Email
              </button>
            </React.Fragment>
          ) : (<button type='button'
              className='btn btn-primary'
              onClick={confirmJobHandler}>Confirm Job</button>)}
        </DialogActionsBar>
      </form>
    </Dialog>
  )
}

export {ConfirmJobModal}
