import { FC, useEffect, useState } from "react"
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'
import { Controller, useForm, useWatch } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Material } from "../../models/quote-model"
import { MATERIAL_DEFAULT } from "../../constant/quote-default"
import { materialFormValidationSchema } from "../../validators/material-form"
import { NumericTextBox } from "@progress/kendo-react-inputs"
import { gtsComputation } from "../utils/material-utils"

interface IProps {
    material: Material
    proceedConfirm: (material: Material) => void
    toggleDialog: () => void
}

const MaterialFormModal: FC<IProps> = ({ material, proceedConfirm, toggleDialog }) => {
    const {
        register,
        formState: { errors, },
        control,
        getValues,
        setValue
    } = useForm({
        defaultValues: material ? { ...material } : MATERIAL_DEFAULT,
        reValidateMode: 'onSubmit',
        resolver: yupResolver(materialFormValidationSchema)
    })

    const onSubmit = () => {
        proceedConfirm(getValues())
    }

    const quantity = useWatch({
        control,
        name: 'quantity'
    })

    const unitPrice = useWatch({
        control,
        name: 'unitPrice'
    })

    const gst = useWatch({
        control,
        name: 'gst'
    })

    useEffect(() => {
        let compute = gtsComputation(quantity, unitPrice, gst)
        setValue('totalPrice', compute)
    }, [quantity, unitPrice, gst])

    

    return (
        <Dialog title={`Material Form`} onClose={toggleDialog} 
            width='90vw'>
            <form name="note">
                <div className="form-group">
                    <label className='form-label' htmlFor='name'>
                        Name
                    </label>
                    <input
                        type='text'
                        className={`form-control${errors.name ? ' border-danger' : ''}`}
                        {...register('name')}
                    />
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor='quantity'>
                        Quantity
                    </label>
                    <input
                        type='number'
                        className={`form-control${errors.quantity ? ' border-danger' : ''}`}
                        {...register('quantity')}
                    />
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor='unitPrice'>
                        Unit Price
                    </label>
                    <Controller
                        control={control}
                        name='unitPrice'
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
                            />
                        )}}
                    />
                </div>
                <div className="form-group mt-4 mb-4">
                    <label className='checkbox form-label'>
                        <input type='checkbox' {...register('gst')} />
                        <span className='fw-bold ms-1'>Include GTS</span>
                    </label>
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor='totalPrice'>
                        Total Price
                    </label>
                    <Controller
                        control={control}
                        name='totalPrice'
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
                                disabled={true}
                            />
                        )}}
                    />
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
                    onClick={toggleDialog}
                >
                    Cancel
                </button>
            </DialogActionsBar>
        </Dialog>
    )
}

export { MaterialFormModal }

