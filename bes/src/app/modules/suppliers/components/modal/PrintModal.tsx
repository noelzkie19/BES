import { FC, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { ISupplier, ISupplierReport } from "../../models/supplier-model";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { useEffectOnce } from "react-use";
import { getSupplierAll, getSupplierPrint } from "../../api";
import { PRINT_FILTER } from "../../constant/config-defaults";
import { ISuppierPrintFilter } from "../../models/config-model";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { printFormValidationSchema } from "../../validators/supplier-form";

interface IProps {
    title: string;
    toggleDialog: () => void
    onPrint: (printDetails: ISupplierReport[]) => void
}

const PrintModal: FC<IProps> = ({ title, toggleDialog, onPrint }) => {

    const [supplierData, setSupplierData] = useState<ISupplier[]>([])

    useEffectOnce(() => {
        getSupplierAll().then((result: any) => {
            setSupplierData(result.data.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1))
        })
    });

    const { register, control, handleSubmit, watch, setValue,  formState: {errors} } = useForm({
        defaultValues: PRINT_FILTER,
        reValidateMode: 'onSubmit',
        resolver: yupResolver(printFormValidationSchema),
    })

    const onSubmit = (value: ISuppierPrintFilter) => {
        getSupplierPrint(value).then((result) => {
            onPrint(result.data);
        })
    }

   
    return (
        <Dialog title={title} onClose={toggleDialog} width={650}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row align-items-center mt-6 pe-2'>
                    <div className='my-2 col-lg-6 col-md-6 col-12 mb-5'>
                        <div className='w-100'>
                            <label className='form-label' htmlFor='from'>
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
                    </div>
                    <div className='my-2 col-lg-6 col-md-6 col-12 mb-5'>
                        <div className='w-100'>
                            <label className='form-label' htmlFor='from'>
                                To:
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
                    </div>
                    <div className='my-2 col-lg-6 col-md-6 col-12 mb-5'>
                        <label className='form-label' htmlFor='from'>
                            Supplier:
                        </label>
                        <select className={`form-control`}
                            {...register(`supplier`)}
                            disabled={watch("isAllSupplier")}>
                            <option value={0}>Select Supplier</option>
                            {(supplierData || []).map((item, idx) => {
                                return (
                                    <option key={idx} value={item.id}>
                                        { item.name }
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='my-2 col-lg-6 col-md-6 col-12 mb-5'>
                        <label className='form-label' htmlFor='from'>
                            All Supplier:
                        </label>
                        <div className='form-check'>
                            <input
                                type='checkbox'
                                className='form-check-input'
                                {...register('isAllSupplier', {
                                    onChange: (event) => {
                                        if (event.target.value) {
                                            setValue('supplier', 0)
                                        }
                                    }
                                })}
                            />
                            <label className='form-check-label' />
                        </div>
                    </div>
                    <div className='my-2 col-lg-6 col-md-6 col-12 mb-5'>
                        <label className='form-label' htmlFor='from'>
                            Print in:
                        </label>
                        <div className="d-flex flex-row">
                            <div className='form-radio d-flex justify-content-end me-5'>
                                <input
                                    type='radio'
                                    className='form-radio-input me-2'
                                    value="asc"
                                    style={{ height: '20px', width: '20px' }}
                                    {...register('sortBy')}
                                />
                                <label className='form-radio-label' /> Ascending Order
                            </div>
                            <div className='form-radio d-flex justify-content-start'>
                                <input
                                    type='radio'
                                    className='form-radio-input me-2'
                                    style={{ height: '20px', width: '20px' }}
                                    value="desc"
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
                        <div className="d-flex flex-row">
                            <div className='form-radio d-flex justify-content-end me-5'>
                                <input
                                    type='radio'
                                    className='form-radio-input me-2'
                                    value="Supplier.Created"
                                    style={{ height: '20px', width: '20px' }}
                                    {...register('by')}  />
                               
                                <label className='form-check-label' /> Date
                            </div>
                            <div className='form-radio d-flex justify-content-start'>
                                <input
                                    type='radio'
                                    className='form-radio-input me-2'
                                    value="Supplier.Name"
                                    style={{ height: '20px', width: '20px' }}
                                    {...register('by')} />
                                <label className='form-check-label' /> Supplier Name
                            </div>
                        </div>
                        
                    </div>
                 </div>

                <DialogActionsBar>
                    <button
                        className="btn btn-primary"
                    >
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

            
        </Dialog >
    )
}

export { PrintModal }