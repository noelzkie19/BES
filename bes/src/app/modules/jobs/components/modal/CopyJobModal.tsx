import {Dialog, DialogActionsBar} from '@progress/kendo-react-dialogs'
import { IEditData, IJobPurchaseData} from '../../models/job-model'
import { set, useForm } from 'react-hook-form'
import { PurchaseOrderComponent } from '../partial/PurchaseOrderComponent'
import { useEffect, useState } from 'react'
import React from 'react'
import { Copy_JOB_INFO } from '../../constant/config-default'


interface IProps {
    suppliers: []
    jobData?: IEditData | null
    handleClose: () => void
    proceedConfirm: (purchaseOrder: IJobPurchaseData[]) => void,
    purchaseOrder: IJobPurchaseData[]
}

const CopyJobModal: React.FC<IProps> = ({  jobData, handleClose, proceedConfirm, purchaseOrder }) => {
  const [purchaseOrderCopy, setPurchaseOrderCopy] = useState<IJobPurchaseData[]>([])
  
    const {
        handleSubmit,
        watch,
        register,
        formState: {errors}
      } = useForm({
        defaultValues: Copy_JOB_INFO,
        reValidateMode: 'onSubmit',
      })

    useEffect(() => {
      if (purchaseOrder) {
        setPurchaseOrderCopy(purchaseOrder)
      }
    }, [purchaseOrder])

    const onSubmit = (values: any) => {
        proceedConfirm(purchaseOrderCopy)
    }
        
    return (
        <Dialog title={'Create Copy Job'} onClose={handleClose} width={850}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='copy-job-container'>
            {/* <div className='text-center copy-option'>
              <label className='checkbox me-5 copy-checkbox'>
                <input type='checkbox'
                  className='form-check-input'
                  {...register('isCopyOperation')}
                />{' '}
                <span>Copy All Operation</span>
              </label>
            </div> */}
            <div className='text-center copy-option'>
              <label className='checkbox me-5 copy-checkbox'>
                <input type='checkbox'
                  className='form-check-input'
                  {...register('isAllPo', {
                    onChange: (event) => {
                      purchaseOrderCopy.forEach((po) => {
                        po.isSelected = event.target.checked
                      })
                      setPurchaseOrderCopy([...purchaseOrderCopy])
                    }
                  })}
                />{' '}
                <span>Copy All Purchase Order</span>
              </label>
            </div>
          </div>
        
          
          {
            !watch('isAllPo') && (
              <React.Fragment>
                 <div>Note: <span className='text-danger'>Please be aware that the displayed Purchase Number is a representation of the copied Purchase Order (PO). A new PO will be assigned once the copying process is proceed.</span></div>
                <PurchaseOrderComponent
                  purchaseOrder={purchaseOrderCopy}
                  createCopy={true}
                  setPurchaseOrder={(purchaseOrders: any) => {
                    setPurchaseOrderCopy([...purchaseOrders])
                  }}
                ></PurchaseOrderComponent>
              </React.Fragment>
            )
          }
           
          

          <DialogActionsBar>
            <button type='submit' 
                    className='btn btn-primary'>Proceed</button>
            <button type='button' className='btn btn-primary' onClick={() => {
              handleClose()
            }}> Cancel</button>
          </DialogActionsBar>
        </form>
      </Dialog>
    )
}

export { CopyJobModal }
