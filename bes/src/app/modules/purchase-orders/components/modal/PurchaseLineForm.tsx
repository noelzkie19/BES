import { yupResolver } from "@hookform/resolvers/yup"
import { ComboBox, MultiColumnComboBox } from "@progress/kendo-react-dropdowns"
import React, { useContext, useEffect, useState } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { IPurchaseReceipt, PurchaseLine } from "../../models/purchase-model";
import { PURCHASELINES_FORM_DEFAULT } from "../../constant/purchase-defaults";
import { purchaseLineFormValidationSchema } from "../../validators/purchase-line-form";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { filterBy } from "@progress/kendo-data-query";
import { optionColumns } from "../../constant/config-default";
import { ButtonModal } from "../../../../../_metronic/partials/content/button/modal/ButtonModal";


type Props = {
    handleClose: () => void
    onSuccess?: (values: PurchaseLine, dataIndex: number) => void,
    purchaseLineValue?: PurchaseLine,
    optionJobs: any[],
    dataIndex: number
}

const PurchaseLineForm: React.FC<Props> = ({ handleClose, onSuccess, purchaseLineValue, optionJobs, dataIndex }) => {
  
    const [optionJobType, setOptionJobType] = useState<any[]>([])
    const [filter,setFilter] = useState<any>(undefined)

    const {
        register,
        formState: { errors, },
        reset,
        control,
        getValues,
        setValue,
    } = useForm({
        defaultValues: purchaseLineValue ? { ...purchaseLineValue } : PURCHASELINES_FORM_DEFAULT,
        reValidateMode: 'onSubmit',
        resolver: yupResolver(purchaseLineFormValidationSchema)
    })

    useEffect(() => {
        if (purchaseLineValue) {
            reset({ ...purchaseLineValue,
                quantityReceived: getTotalReceipt() })
        } else {
            reset(PURCHASELINES_FORM_DEFAULT)
        }
    }, [purchaseLineValue, reset])

    const costEach = useWatch({
        control,
        name: 'costEach'
    })
    const quantity = useWatch({
        control,
        name: 'quantity'
    })

  
    useEffect(() => {
        const costTotal = costEach * quantity;
        setValue('costTotal', costTotal)
    }, [quantity, costEach])
 
    useEffect(() => {
        if (optionJobs) setOptionJobType(optionJobs)
    }, [optionJobs])

    const getTotalReceipt = () => {
      return  (purchaseLineValue?.purchaseReceipts || []).reduce(
            (sum: any, current: any) => sum + current.quantity,
            0)
    }
    const onSubmit = () => {
        var data = getValues();
        if (onSuccess)
            onSuccess(getValues(), dataIndex);
    };
    const onReset = async () => {
        reset(PURCHASELINES_FORM_DEFAULT)
    };

    const getJob = (value: number | null) => {
        let job = optionJobs.find((c: any) => c.id === value);
        if (job) return job
        else {}
    }

    const handleFilterChange = (event: any) => {
        setFilter(event.filter)
    }

    
    return (
        <Dialog title={"Purchase Form"} onClose={handleClose} 
            width='90vw' height='60vh'>
            <form onReset={onReset} name="address" >
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-12 pe-2  mb-4'>
                        <label className='form-label' htmlFor='purchaseNumber'>
                        PO Number
                        </label>
                        <input
                            type='text'
                            disabled={true}
                            className={`form-control${errors.purchaseNumber ? ' border-danger' : ''}`}
                            {...register('purchaseNumber')}
                        />
                    </div>
                    <div className='col-lg-6 col-md-6 col-12 pe-2  mb-4'>
                        <label className='form-label' htmlFor='jobId'>
                            Job No.
                        </label>
                        <Controller
                            control={control}
                            name='jobId'
                            render={({field: {value, onChange}}) => {
                            return (
                                <MultiColumnComboBox
                                    data={filterBy(optionJobType || [], filter)}
                                    columns={optionColumns}
                                    onChange={(event: any) => {
                                        onChange(event.value.id)
                                    }}
                                    textField={"text"}
                                    value={getJob(value)}
                                    filterable={true}
                                    onFilterChange={handleFilterChange}
                                    style={{
                                        width: "300px",
                                    }}
                                    placeholder="Please select ..."
                                 />
                            )
                            }}
                        />
                    </div>
                    <div className='col-12 mb-4'>
                        <label className='form-label' htmlFor='description'>
                            Description
                        </label>
                        <input
                            type='text'
                            className={`form-control${errors.description ? ' border-danger' : ''}`}
                            {...register('description')}
                        />
                        {errors.description && (
                            <span className='text-danger fs-6'>{errors.description.message}</span>
                        )}
                    </div>
                    <div className='col-lg-6 col-md-6 col-12 mb-4'>
                        <label className='form-label' htmlFor='quantity'>
                            Quantity
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
                        {/* <input
                            type='text'
                            className={`form-control${errors.quantity ? ' border-danger' : ''}`}
                            {...register('quantity')}
                        /> */}
                        {errors.description && (
                            <span className='text-danger fs-6'>{errors.quantity?.message}</span>
                        )}
                    </div>
                    <div className='col-lg-6 col-md-6 col-12 mb-4'>
                        <label className='form-label' htmlFor='quantity'>
                            Received Qty
                        </label>
                        <input
                            type='text'
                            className={`form-control${errors.quantityReceived ? ' border-danger' : ''}`}
                            disabled
                            {...register('quantityReceived')}
                        />
                        {errors.description && (
                            <span className='text-danger fs-6'>{errors.quantityReceived?.message}</span>
                        )}
                    </div>
                    <div className='col-lg-6 col-md-6 col-12 mb-4'>
                        <label className='form-label' htmlFor='costEach'>
                            Unit Price
                        </label>
                        <Controller
                            control={control}
                            name='costEach'
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
                                    spinners = {false}
                                />
                            )}}
                        />
                        {errors.description && (
                            <span className='text-danger fs-6'>{errors.quantity?.message}</span>
                        )}
                    </div>
                    <div className='col-lg-6 col-md-6 col-12 mb-4'>
                        <div className='checkbox-list d-flex align-items-buttom mb-5'>
                            <label className='checkbox'>
                                <input type='checkbox' {...register('isIncludeGST')} />
                                <span className='fw-bold ms-1'>Include GTS</span>
                            </label>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-12 mb-4'>
                       <label className='form-label' htmlFor='costTotal'>
                            Total Price
                        </label>
                        <Controller
                            control={control}
                            name='costTotal'
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
                                    spinners = {false}
                                />
                            )}}
                        />
                    </div>
                    <div className='col-lg-6 col-md-6 col-12 mb-4'>
                       <label className='form-label' htmlFor='costTotal'>
                            Due Date
                        </label>
                        <Controller
                            control={control}
                            name="dueDate"
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
                    <div className='col-lg-6 col-md-6 col-12 mb-4'>
                        <div className='checkbox-list d-flex align-items-buttom mb-5'>
                            <label className='checkbox'>
                                <input type='checkbox' {...register('isMaterialCertRequired')} />
                                <span className='fw-bold ms-1'>MCR</span>
                            </label>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-12 mb-4'>
                        <label className='form-label' htmlFor='invoiceNumber'>
                            Invoice
                        </label>
                        <input
                            type='text'
                            className={`form-control${errors.invoiceNumber ? ' border-danger' : ''}`}
                            {...register('invoiceNumber')}
                        />
                        {errors.description && (
                            <span className='text-danger fs-6'>{errors.invoiceNumber?.message}</span>
                        )}
                    </div>
                </div>
            </form>
        <DialogActionsBar>
            <ButtonModal proceedHandler={onSubmit}
                        cancelHandler={handleClose}></ButtonModal>
                    
          {/* <button
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
          </button> */}
        </DialogActionsBar>
      </Dialog>
    )

}

export { PurchaseLineForm }
