import { yupResolver } from "@hookform/resolvers/yup"
import { ComboBox } from "@progress/kendo-react-dropdowns"
import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { addressFormValidationSchema } from "../../validators/supplier-form";
import { SUPPLIER_ADDRESS_DEFAULT } from "../../constant/supplier-defaults";
import { ISupplierAddress } from "../../models/supplier-model";


type Props = {
    handleClose: () => void
    onSuccess?: (values: ISupplierAddress, dataIndex: number) => void,
    addressValue?: ISupplierAddress,
    optionStates: any[],
    dataIndex: number
}

const AddressForm: React.FC<Props> = ({ handleClose, onSuccess, addressValue, optionStates, dataIndex }) => {
  
    const [optionStatesType, setOptionStatesType] = useState<any[]>([])

    const {
        register,
        formState: { errors, },
        reset,
        control,
        getValues
    } = useForm({
        defaultValues: addressValue ? { ...addressValue } : SUPPLIER_ADDRESS_DEFAULT,
        reValidateMode: 'onSubmit',
        resolver: yupResolver(addressFormValidationSchema)
    })

    useEffect(() => {
        if (addressValue) {
            reset({ ...addressValue })
        } else {
            reset(SUPPLIER_ADDRESS_DEFAULT)
        }
    }, [addressValue, reset])


    useEffect(() => {
        if (optionStates) setOptionStatesType(optionStates)
    }, [optionStates])

    const onSubmit = () => {
        if (onSuccess)
            onSuccess(getValues(), dataIndex);
    };
    const onReset = async () => {
        reset(SUPPLIER_ADDRESS_DEFAULT)
    };

    const getStates = (value: string) => {
        let state = optionStates.find((c: any) => c.id === value);
        if (state) return state
        else {}
    }
    
    
    return (
        <Dialog title={"Address Form"} onClose={handleClose} width='90vw'>
            <form onReset={onReset} name="address">
                <div className='modal-body'>
                    <div className='col col-12 pe-2  mb-4'>
                        <label className='form-label' htmlFor='street'>
                            Street
                        </label>
                        <input
                            type='text'
                            className={`form-control${errors.street ? ' border-danger' : ''}`}
                            {...register('street')}
                        />
                    </div>

                    <div className='col col-12 pe-2  mb-4'>
                        <label className='form-label' htmlFor='suburb'>
                            Suburb
                        </label>
                        <input
                            type='text'
                            className={`form-control${errors.suburb ? ' border-danger' : ''}`}
                            {...register('suburb')}
                        />
                    </div>

                    <div className='col col-12 pe-2  mb-4'>
                        <label className='form-label' htmlFor='state'>
                            State
                        </label>
                        <Controller
                            control={control}
                            name='state'
                            render={({field: {value, onChange}}) => {
                            return (
                                <ComboBox
                                    data={optionStatesType}
                                    defaultValue={getStates(value)}
                                    // defaultValue
                                    onChange={(event) => onChange(event.value.id)}
                                    textField="text"
                                    dataItemKey="id"
                                />
                            )
                            }}
                        />
                    </div>

                    <div className='col col-12 mb-4'>
                        <label className='form-label' htmlFor='postCode'>
                            Post Code
                        </label>
                        <input
                            type='text'
                            className={`form-control${errors.postCode ? ' border-danger' : ''}`}
                            {...register('postCode')}
                        />
                        {errors.postCode && (
                            <span className='text-danger fs-6'>{errors.postCode.message}</span>
                        )}
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

export { AddressForm }