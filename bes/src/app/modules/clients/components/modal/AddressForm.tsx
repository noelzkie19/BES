import { yupResolver } from "@hookform/resolvers/yup"
import { ComboBox } from "@progress/kendo-react-dropdowns"
import React, { useContext, useEffect, useState } from "react"
import { Modal } from "react-bootstrap-v5"
import { Controller, useForm } from "react-hook-form"
import { CLIENT_ADDRESS_DEFAULT } from "../../constant/client-defaults"
import { IClientAddress } from "../../models/client-model"
import { addressFormValidationSchema } from "../../validators/client-form"
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";


type Props = {
    handleClose: () => void
    onSuccess?: (values: IClientAddress, dataIndex: number) => void,
    addressValue?: IClientAddress,
    optionStates: any[],
    dataIndex: number
}

const AddressForm: React.FC<Props> = ({ handleClose, onSuccess, addressValue, optionStates, dataIndex }) => {
  
    const [optionStatesType, setOptionStatesType] = useState<any[]>([])

    const {
        register,
        handleSubmit,
        formState: { errors, },
        reset,
        control,
        getValues
    } = useForm({
        defaultValues: addressValue ? { ...addressValue } : CLIENT_ADDRESS_DEFAULT,
        reValidateMode: 'onSubmit',
        resolver: yupResolver(addressFormValidationSchema)
    })

    useEffect(() => {
        if (addressValue) {
            reset({ ...addressValue })
        } else {
            reset(CLIENT_ADDRESS_DEFAULT)
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
        reset(CLIENT_ADDRESS_DEFAULT)
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
                                style={{scrollbarColor: 'black'}}
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