import {FC, useState} from 'react'
// import { Controller, useForm } from "react-hook-form"
import {Dialog, DialogActionsBar} from '@progress/kendo-react-dialogs'
import {DatePicker} from '@progress/kendo-react-dateinputs'
import {useEffectOnce} from 'react-use'
import {IStockPrintFilter, IStockReport} from '../models/stock-model'
import {getClients, getStockPrint} from '../api'
import {IClient} from '../../clients/models/client-model'
import {useForm} from 'react-hook-form'
import {PRINT_FILTER} from '../constant/config-map'
// import { PRINT_FILTER } from "../../constant/config-default";
// import { IClient } from "../../../clients/models/client-model";

interface IProps {
  title: string
  toggleDialog: () => void
  onPrint: (printDetails: IStockReport[]) => void
}

const PrintModal: FC<IProps> = ({title, toggleDialog, onPrint}) => {
  const [clientOptions, setClientOptions] = useState<IClient[]>([])
  const [clientName, setClientName] = useState([])
  const [clientVal, setclientVal] = useState(1)

  useEffectOnce(() => {
    // getClientAll().then((result: any) => {
    //     setClientData(result.data.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1))
    // })
    getClients()
      .then((response: any) => {
        setClientOptions(response.data)
        response.data.forEach((element: any) => {
          setClientName((clientName) => clientName.concat(element.name))
        })
      })
      .catch(() => {
        alert('error')
      })
  })

  const {register, control, handleSubmit, watch, setValue} = useForm({
    defaultValues: PRINT_FILTER,
    reValidateMode: 'onSubmit',
  })

  const onSubmit = (value: IStockPrintFilter) => {
    if (value.client == 0 && !value.isAllClient) {
    } else {
      getStockPrint(value).then((result) => {
        onPrint(result.data)
      })
    }
  }
  const handleClientChange = (e: any) => {
    setclientVal(e.target.value)
  }

  return (
    <Dialog title={title} onClose={toggleDialog}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row align-items-center mt-6 pe-2'>
          <div className='my-2 col-lg-6 col-md-6 col-12 mb-5'>
            <label className='form-label' htmlFor='from'>
              Client:
            </label>
            <select
              className={`form-control`}
              {...register(`client`)}
              disabled={watch('isAllClient')}
            >
              <option value={0}>Select Client</option>
              {(clientOptions || []).map((item, idx) => {
                return (
                  <option key={idx} value={item.id}>
                    {item.name}
                  </option>
                )
              })}
            </select>
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
                      setValue('client', 0)
                    }
                  },
                })}
              />
              <label className='form-check-label' />
            </div>
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
                  value='Stock.Id asc'
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
                  value='Stock.Id desc'
                  {...register('sortBy')}
                />
                <label className='form-check-label' /> Decending Order
              </div>
            </div>
          </div>
        </div>

        <DialogActionsBar>
          <button className='btn btn-primary'>
            Print
          </button>
          <button
            className='btn btn-outline-primary'
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
