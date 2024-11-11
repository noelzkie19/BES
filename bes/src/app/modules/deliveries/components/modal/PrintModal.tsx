import {FC, useEffect, useState} from 'react'
import {Controller, useForm, useWatch} from 'react-hook-form'
import {Dialog, DialogActionsBar} from '@progress/kendo-react-dialogs'
import {DatePicker} from '@progress/kendo-react-dateinputs'
import {useEffectOnce} from 'react-use'
import {IDeliveryPrintFilter, IDeliveryReport} from '../../models/delivery-model'
import {getClientAll, getDeliveriesReport} from '../../api'
import {PRINT_FILTER} from '../../constant/config-default'
import {ComboBox, ComboBoxFilterChangeEvent} from '@progress/kendo-react-dropdowns'
import {transforClientOption} from '../../transformer/delivery-transformer'
import {yupResolver} from '@hookform/resolvers/yup'
import {printFormValidationSchema} from '../../validators/print-form'
import {ErrorMessage} from '@hookform/error-message'

interface IProps {
  title: string
  toggleDialog: () => void
  onPrint: (printDetails: IDeliveryReport[]) => void
}

const PrintModal: FC<IProps> = ({title, toggleDialog, onPrint}) => {
  const [clientData, setClientData] = useState<[]>([])
  const [optionData, setOptionData] = useState<[]>([])

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm({
    defaultValues: PRINT_FILTER,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(printFormValidationSchema),
  })

  useEffectOnce(() => {
    getClientAll().then((result: any) => {
      const data = result.data.sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
      setClientData(transforClientOption(data))
      setOptionData(transforClientOption(data))
    })
  })

  const isAllClientValue = useWatch({
    control,
    name: 'isAllClient',
  })

  useEffect(() => {
    if (isAllClientValue) {
      setValue('clientId', 0)
    }
  }, [isAllClientValue, setValue])

  const onSubmit = (value: IDeliveryPrintFilter) => {
    getDeliveriesReport(value).then((result: any) => {
      if (result) onPrint(result.data)
    })
  }

  const onFilterChange = (event: ComboBoxFilterChangeEvent) => {
    const newData: any = clientData.filter((x: any) => x.text.toLowerCase().includes(event.filter.value.toLowerCase()))
    setOptionData(newData)
  }

  return (
    <Dialog title={title} onClose={toggleDialog}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row align-items-center mt-6 pe-2'>
          <div className='my-2 col-lg-6 col-md-6 col-12 mb-5'>
            <div className='w-100'>
              <label className='form-label' htmlFor='from'>
                From
              </label>
              <Controller
                control={control}
                name='from'
                render={({field: {value, name, onChange}}) => {
                  const date = value ? new Date(value || '') : null
                  return (
                    <DatePicker format='dd/MM/yyyy' name={name} value={date} onChange={onChange} />
                  )
                }}
              />
            </div>
          </div>
          <div className='my-2 col-lg-6 col-md-6 col-12 mb-5'>
            <div className='w-100'>
              <label className='form-label' htmlFor='from'>
                To:
              </label>
              <Controller
                control={control}
                name='to'
                render={({field: {value, name, onChange}}) => {
                  const date = value ? new Date(value || '') : null
                  return (
                    <DatePicker format='dd/MM/yyyy' name={name} value={date} onChange={onChange} />
                  )
                }}
              />
              <div>
                <ErrorMessage errors={errors} name='to' as={<span className='spanError' />} />
              </div>
            </div>
          </div>
          <div className='my-2 col-lg-6 col-md-6 col-12 mb-5'>
            <label className='form-label' htmlFor='from'>
              All Client:
            </label>
            <div className='form-check'>
              <input
                type='checkbox'
                className='form-check-input'
                {...register('isAllClient', {
                  onChange: (event) => {
                    if (event.target.value) {
                      setValue('clientId', 0)
                    }
                  },
                })}
              />
              <label className='form-check-label' />
            </div>
          </div>
          <div className='my-2 col-lg-6 col-md-6 col-12 mb-5'>
            <label className='form-label' htmlFor='from'>
              Client:
            </label>
            <Controller
              control={control}
              name='clientId'
              render={({field: {value, name, onChange}}) => {
                const selectedData = (clientData || []).find((c: any) => c.id === value)
                return (
                  <ComboBox
                    data={optionData}
                    name={name}
                    defaultValue={selectedData}
                    onChange={(e: any) => onChange(e.value.id)}
                    textField='text'
                    dataItemKey='id'
                    disabled={watch('isAllClient')}
                    filterable={true}
                    onFilterChange={onFilterChange}
                  />
                )
              }}
            />
          </div>
          <div className='my-2 col-lg-6 col-md-6 col-12 mb-5'>
            <label className='form-label' htmlFor='from'>
              Print in:
            </label>
            <div className='d-flex flex-row'>
              <div className='form-radio d-flex justify-content-end me-5'>
                <input
                  type='radio'
                  className='form-radio-input me-2'
                  value='asc'
                  style={{height: '20px', width: '20px'}}
                  {...register('sortBy')}
                />
                <label className='form-radio-label' /> Ascending Order
              </div>
              <div className='form-radio d-flex justify-content-start'>
                <input
                  type='radio'
                  className='form-radio-input me-2'
                  style={{height: '20px', width: '20px'}}
                  value='desc'
                  {...register('sortBy')}
                />
                <label className='form-check-label' /> Descending Order
              </div>
            </div>
          </div>
          <div className='my-2 col-lg-6 col-md-6 col-12 mb-5'>
            <label className='form-label' htmlFor='from'>
              By:
            </label>
            <div className='d-flex flex-row'>
              <div className='form-radio d-flex justify-content-end me-5'>
                <input
                  type='radio'
                  className='form-radio-input me-2'
                  value='Delivery.Date'
                  style={{height: '20px', width: '20px'}}
                  {...register('by')}
                />
                <label className='form-check-label' /> Date
              </div>
              <div className='form-radio d-flex justify-content-start'>
                <input
                  type='radio'
                  className='form-radio-input me-2'
                  value='Delivery.DeliveryNumber'
                  style={{height: '20px', width: '20px'}}
                  {...register('by')}
                />
                <label className='form-check-label' /> Delivery Number
              </div>
            </div>
          </div>
        </div>

        <DialogActionsBar>
          <button className="btn btn-primary">
            Print
          </button>
          <button
           className="btn btn-outline-primary"
            onClick={toggleDialog}
          >
            Close
          </button>
        </DialogActionsBar>
      </form>
    </Dialog>
  )
}

export {PrintModal}
