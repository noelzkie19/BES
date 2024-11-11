import { Controller, useForm } from "react-hook-form";
import { Window, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { FC } from "react";
import { IPurchaseReceiptData } from "../../models/purchase-model";
import { transforQtyReceiveOption } from "../../transformer/purchase-transformer";
import { yupResolver } from "@hookform/resolvers/yup";
import { purchaseReceiptFormValidationSchema } from "../../validators/purchase-receipt-form";
import {DatePicker} from '@progress/kendo-react-dateinputs'
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { ButtonModal } from "../../../../../_metronic/partials/content/button/modal/ButtonModal";

interface IProps {
    dataReceipt: IPurchaseReceiptData,
    toggleDialog: () => void,
    submit: (dataReceipt: IPurchaseReceiptData) => void
}

const ReceiptPurchaseItem: FC<IProps> = ({ dataReceipt, toggleDialog, submit }) => {
    const { 
        register, 
        control,
        formState: { errors },
        getValues
    } = useForm({
        defaultValues: dataReceipt,
        reValidateMode: 'onSubmit',
        resolver: yupResolver(purchaseReceiptFormValidationSchema),
    })

    const onSubmit = () => {
        submit(getValues())
    }

    return (
        <Window title='Receipt of Purchase Order Item' onClose={toggleDialog} 
            initialHeight={750}
            initialWidth={850}
            >
            <form name="purchaseReceipt">
                <div className='modal-body'>
                    
                    <div className='grey-wrap bg-light p-5'>
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <div className="d-flex flex-row">
                                    <p className="font-weight-bold me-2">
                                        Supplier:
                                    </p>
                                    <span>
                                        {dataReceipt.supplierName}
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="d-flex flex-row">
                                    <p className="font-weight-bold me-2">
                                        Job Number:
                                    </p>
                                    <span>
                                        {dataReceipt.displayJobId}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <div className="d-flex flex-row">
                                    <p className="font-weight-bold me-2">
                                        PO Number:
                                    </p>
                                    <span>
                                        {dataReceipt.displayPurchaseNumber}
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="d-flex flex-row">
                                    <p className="font-weight-bold me-2">
                                        Client:
                                    </p>
                                    <span>
                                        {dataReceipt.clientName}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <div className="d-flex flex-row">
                                    <p className="font-weight-bold me-2">
                                        Item Description:
                                    </p>
                                    <span>
                                        {dataReceipt.decription}
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="d-flex flex-row">
                                    <p className="font-weight-bold me-2">
                                        Job Description:
                                    </p>
                                    <span>
                                        {dataReceipt.jobDescription}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='grey-wrap bg-light p-5 mt-2'>
                        <div className='row'>
                            <div className="col-lg-6 col-12">
                                <table style={{width: '100%'}}>
                                    <tbody>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label className='form-label' htmlFor=''>
                                                    Order Quantity
                                                </label>
                                            </td>
                                            <td>
                                                <input type='number' className={`form-control`} 
                                                        {...register('poQuantity')} disabled/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label className='form-label' >
                                                    Received Qty
                                                </label>
                                            </td>
                                            <td>
                                                <Controller
                                                    control={control}
                                                    name='quantity'
                                                    render={({field: {value, name, onChange}}) => {
                                                        return (
                                                        <NumericTextBox
                                                            name={name}
                                                            width='100%'
                                                            onChange={onChange}
                                                            value={value}
                                                            defaultValue={0}
                                                            format='0'
                                                            min={0}
                                                            spinners = {false}
                                                        />
                                                    )}}
                                                />
                                                {errors.quantity && (
                                                    <span className='text-danger fs-6'>{errors.quantity?.message}</span>
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <label className='form-label'>Receipt Date</label>
                                            </td>
                                            <td>
                                            <Controller
                                                control={control}
                                                name='date'
                                                render={({field: {value, name, onChange}}) => {
                                                    return (
                                                    <DatePicker
                                                        format='dd/MM/yyyy'
                                                        name={name}
                                                        onChange={onChange}
                                                        value={value ? new Date(value || '') : null}
                                                    />
                                                    )
                                                }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label className='form-label' htmlFor=''>
                                                    Packing Slip Number
                                                </label>
                                            </td>
                                            <td>
                                                <input type='text' 
                                                className={`form-control${errors.packingSlipNumber ? ' border-danger' : ''}`}
                                                {...register('packingSlipNumber')}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label className='form-label' htmlFor=''>
                                                    Lot Number
                                                </label>
                                            </td>
                                            <td>
                                                <input className={`form-control`} 
                                                {...register('lotNumber')}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                 <label className='form-label' htmlFor=''>
                                                    Heat Number
                                                </label>
                                            </td>
                                            <td>
                                                <input type='text' 
                                                    className={`form-control${errors.heatNumber ? ' border-danger' : ''}`}
                                                    {...register('heatNumber')}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <label className='form-label' htmlFor=''>
                                                    Goods Inspected and received as correct by
                                                </label>
                                                <input type='text' 
                                                    className={`form-control${errors.goodInspctReceivedBy ? ' border-danger' : ''}`}
                                                    {...register('goodInspctReceivedBy')}/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-lg-6 col-12">
                                <table style={{width: '100%'}}>
                                    <tbody>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label className='form-label' htmlFor=''>
                                                Qty Previously Received
                                                </label>
                                            </td>
                                            <td>
                                                <input type='number' className={`form-control`} 
                                                        {...register('quantityPreviouslyReceived')} disabled/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                            <label className='form-label' htmlFor=''>
                                                Notes
                                            </label>
                                            <textarea className={`form-control`} 
                                                {...register('note')}/>
                                            </td>
                                        </tr>
                                    </tbody>
                                   </table>
                            </div>
                            {/* <div className='col col-6'>
                                <div className='col col-12 pe-2  mb-4'>
                                    <label className='form-label' htmlFor=''>
                                      Qty Previously Received
                                    </label>
                                    <select className={`form-control`}>
                                        {(transforQtyReceiveOption(dataReceipt.historyReceipts) || [])
                                            .map((data: any) => {
                                              return  <option value={data.value}>{data.label}</option>
                                        })}
                                    </select>
                                </div>
                                <div className='col col-12 pe-2  mb-4'>
                                    <label className='form-label' htmlFor=''>
                                        Notes
                                    </label>
                                    <input className={`form-control`} 
                                        {...register('note')}/>
                                </div>
                                <div className='col col-12 pe-2  mb-4'>
                                    <label className='form-label' htmlFor=''>
                                        Packing Slip Number
                                    </label>
                                    <input type='text' 
                                        className={`form-control${errors.packingSlipNumber ? ' border-danger' : ''}`}
                                        {...register('packingSlipNumber')}/>
                                </div>
                                <div className='col col-12 pe-2  mb-4'>
                                    <label className='form-label' htmlFor=''>
                                        Lot Number
                                    </label>
                                    <input className={`form-control`} 
                                        {...register('lotNumber')}/>
                                </div>
                            </div> */}
                            {/* <div className='col col-6'>
                                <div className='col col-12 pe-2  mb-4'>
                                        <label className='form-label'>Receipt Date</label>
                                        <Controller
                                        control={control}
                                        name='date'
                                        render={({field: {value, name, onChange}}) => {
                                            return (
                                            <DatePicker
                                                format='dd/MM/yyyy'
                                                name={name}
                                                onChange={onChange}
                                                value={value ? new Date(value || '') : null}
                                            />
                                            )
                                        }}
                                        />
                                </div>
                                <div className='col col-12 pe-2  mb-4'>
                                    <label className='form-label' htmlFor=''>
                                        Order Quantity
                                    </label>
                                    <input type='number' className={`form-control`} 
                                        {...register('poQuantity')} disabled/>
                                </div>
                                <div className='col col-12 pe-2  mb-4'>
                                    <label className='form-label' >
                                        Received Qty
                                    </label>
                                    <Controller
                                        control={control}
                                        name='quantity'
                                        render={({field: {value, name, onChange}}) => {
                                            return (
                                            <NumericTextBox
                                                name={name}
                                                width='100%'
                                                onChange={onChange}
                                                value={value}
                                                defaultValue={0}
                                                format='0'
                                                min={0}
                                                spinners = {false}
                                            />
                                        )}}
                                    />
                                    {errors.quantity && (
                                        <span className='text-danger fs-6'>{errors.quantity?.message}</span>
                                    )}
                                </div>
                                <div className='col col-12 pe-2  mb-4'>
                                    <label className='form-label' htmlFor=''>
                                        Heat Number
                                    </label>
                                    <input type='text' 
                                        className={`form-control${errors.heatNumber ? ' border-danger' : ''}`}
                                        {...register('heatNumber')}/>
                                </div>
                                <div className='col col-12 pe-2  mb-4'>
                                    <label className='form-label' htmlFor=''>
                                        Goods Inspected and received as correct by
                                    </label>
                                    <input type='text' 
                                        className={`form-control${errors.goodInspctReceivedBy ? ' border-danger' : ''}`}
                                        {...register('goodInspctReceivedBy')}/>
                                </div>
                            </div> */}
                            
                        </div>
                    </div>
                </div>
            </form>

            <DialogActionsBar>
                    <ButtonModal proceedHandler={onSubmit}
                        cancelHandler={toggleDialog}></ButtonModal>
                        
                    {/* <button
                        type="button"
                        className="btn btn-primary"
                        onClick={onSubmit}>
                        Proceed
                    </button>
                    <button
                        className="btn btn-outline-primary"
                        onClick={toggleDialog}
                    >
                        Cancel
                    </button> */}
            </DialogActionsBar>

        </Window >
    )
}

export { ReceiptPurchaseItem }