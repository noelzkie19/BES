import { FC, useEffect, useState } from "react"
import { Operation } from "../../models/job-model"
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { OPERATION_DEFAULT } from "../../constant/job-default"
import { operationFormValidationSchema } from "../../validators/operation-form"
import { ComboBox } from "@progress/kendo-react-dropdowns"
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";

interface IProps {
    operation: Operation
    proceedConfirm: (operation: Operation) => void
    toggleDialog: () => void,
    optionResource: any[],
    optionUsers: any[]
}

const OperationDataModal: FC<IProps> = ({ operation, proceedConfirm, toggleDialog, optionResource, optionUsers }) => {

    const [optionResourceType, setOptionResourceType] = useState<any[]>([])
    const [optionUsersType, setOptionUsersType] = useState<any[]>([])
    const [selected, setSelected] = useState(0);
    const {
        register,
        formState: { errors, },
        control,
        getValues
    } = useForm({
        defaultValues: operation ? { ...operation } : OPERATION_DEFAULT,
        reValidateMode: 'onSubmit',
        resolver: yupResolver(operationFormValidationSchema)
    })


    const onSubmit = () => {
        proceedConfirm(getValues())
    }
    const handleSelect = (e: any) => {
        setSelected(e.selected);
    };
    
    useEffect(() => {
        if (optionResource) setOptionResourceType(optionResource)
    }, [optionResource])

    useEffect(() => {
        if (optionUsers) setOptionUsersType(optionUsers)
    }, [optionUsers])
    
    const getResource = (value: number) => {
        let resource = optionResource.find((c: any) => c.id === value);
        if (resource) return resource
        else {}
    }

    const getUsers = (value: number) => {
        let user = optionUsers.find((c: any) => c.id === value);
        if (user) return user
        else {}
    }

    return (
        <Dialog title={`Operations Form`} onClose={toggleDialog} 
            width='90vw'
            height='60vh'>
            <form name="address">
            {/* <TabStrip selected={selected} onSelect={handleSelect}>
              <TabStripTab title="Operation">
                <div className="row">
                    <div className='col-lg-6 col-md-6 col-12 pe-2  mb-4'>
                        <label className='form-label' htmlFor='number'>
                            Operation Number
                        </label>
                        <input
                            type='text'
                            className={`form-control${errors.number ? ' border-danger' : ''}`}
                            {...register('number')}
                        />
                    </div>
                    <div className='col-lg-6 col-md-6 col-12 pe-2  mb-4'>
                        <label className='form-label' htmlFor='resourceId'>
                            Resource
                        </label>
                        <Controller
                            control={control}
                            name='resourceId'
                            render={({field: {value, onChange}}) => {
                            return (
                                <ComboBox
                                    data={optionResourceType}
                                    defaultValue={getResource(value)}
                                    // defaultValue
                                    onChange={(event) => onChange(event.value.id)}
                                    textField="text"
                                    dataItemKey="id"
                                />
                            )
                            }}
                        />
                    </div>
                    <div className='col-lg-6 col-md-6 col-12 pe-2  mb-4'>
                        <label className='form-label' htmlFor='description'>
                            Description
                        </label>
                        <input
                            type='text'
                            className={`form-control${errors.description ? ' border-danger' : ''}`}
                            {...register('description')}
                        />
                    </div>
                    <div className='col-lg-6 col-md-6 col-12 pe-2  mb-4'>
                        <label className='form-label' htmlFor='quantity'>
                            Quantity
                        </label>
                        <input
                            type='text'
                            className={`form-control${errors.quantity ? ' border-danger' : ''}`}
                            {...register('quantity')}
                        />
                    </div>
                    <div className='col-lg-6 col-md-6 col-12 pe-2  mb-4'>
                        <label className='form-label' htmlFor='expectedProcessTime'>
                            Process Hours
                        </label>
                        <input
                            type='text'
                            className={`form-control${errors.expectedProcessTime ? ' border-danger' : ''}`}
                            {...register('expectedProcessTime')}
                        />
                    </div>
                </div>
               </TabStripTab>
               <TabStripTab title="First off checks">
                <div className="row">
                    <h5 className='mb-5 mt-5'>1st</h5>
                    <div className="col-6">
                        <input
                            type='text'
                            className={`form-control${errors.firstFocHr ? ' border-danger' : ''}`}
                            {...register('firstFocHr')}
                        />
                    </div>
                    <div className="col-6">
                        <Controller
                                control={control}
                                name='firstFocOperatorId'
                                render={({field: {value, onChange}}) => {
                                return (
                                    <ComboBox
                                        data={optionUsersType}
                                        defaultValue={getUsers(value)}
                                        onChange={(event) => onChange(event.value.id)}
                                        textField="text"
                                        dataItemKey="id"
                                    />
                                )
                            }}
                        />
                    </div>
                    <h5 className='mb-5 mt-5'>2st</h5>
                    <div className="col-6">
                        <input
                            type='text'
                            className={`form-control${errors.secondFocHr ? ' border-danger' : ''}`}
                            {...register('secondFocHr')}
                        />
                    </div>
                    <div className="col-6">
                        <Controller
                                control={control}
                                name='secondFocOperatorId'
                                render={({field: {value, onChange}}) => {
                                return (
                                    <ComboBox
                                        data={optionUsersType}
                                        defaultValue={getUsers(value)}
                                        onChange={(event) => onChange(event.value.id)}
                                        textField="text"
                                        dataItemKey="id"
                                    />
                                )
                            }}
                        />
                    </div>
                    <h5 className='mb-5 mt-5'>3rd</h5>
                    <div className="col-6">
                        <input
                            type='text'
                            className={`form-control${errors.thirdFocHr ? ' border-danger' : ''}`}
                            {...register('thirdFocHr')}
                        />
                    </div>
                    <div className="col-6">
                        <Controller
                            control={control}
                            name='thirdFocOperatorId'
                            render={({field: {value, onChange}}) => {
                            return (
                                <ComboBox
                                    data={optionUsersType}
                                    defaultValue={getUsers(value)}
                                    onChange={(event) => onChange(event.value.id)}
                                    textField="text"
                                    dataItemKey="id"
                                    />
                                )
                            }}
                        />
                    </div>
                    <h5 className='mb-5 mt-5'>4th</h5>
                    <div className="col-6">
                        <input
                            type='text'
                            className={`form-control${errors.fourthFocHr ? ' border-danger' : ''}`}
                            {...register('fourthFocHr')}
                        />
                    </div>
                    <div className="col-6">
                        <Controller
                            control={control}
                            name='fourthFocOperatorId'
                            render={({field: {value, onChange}}) => {
                            return (
                                <ComboBox
                                    data={optionUsersType}
                                    defaultValue={getUsers(value)}
                                    onChange={(event) => onChange(event.value.id)}
                                    textField="text"
                                    dataItemKey="id"
                                    />
                                )
                            }}
                        />
                    </div>
                </div>
               </TabStripTab>
               <TabStripTab title="Production Checks">
               <div className="row">
               <h5 className='mb-5 mt-5'>1st</h5>
                    <div className="col-6">
                        <input
                            type='text'
                            className={`form-control${errors.firstPcHr ? ' border-danger' : ''}`}
                            {...register('firstPcHr')}
                        />
                    </div>
                    <div className="col-6">
                        <Controller
                                control={control}
                                name='firstPcOperatorId'
                                render={({field: {value, onChange}}) => {
                                return (
                                    <ComboBox
                                        data={optionUsersType}
                                        defaultValue={getUsers(value)}
                                        onChange={(event) => onChange(event.value.id)}
                                        textField="text"
                                        dataItemKey="id"
                                    />
                                )
                            }}
                        />
                    </div>
                    <h5 className='mb-5 mt-5'>2st</h5>
                    <div className="col-6">
                        <input
                            type='text'
                            className={`form-control${errors.secondPcHr ? ' border-danger' : ''}`}
                            {...register('secondPcHr')}
                        />
                    </div>
                    <div className="col-6">
                        <Controller
                                control={control}
                                name='secondPcOperatorId'
                                render={({field: {value, onChange}}) => {
                                return (
                                    <ComboBox
                                        data={optionUsersType}
                                        defaultValue={getUsers(value)}
                                        onChange={(event) => onChange(event.value.id)}
                                        textField="text"
                                        dataItemKey="id"
                                    />
                                )
                            }}
                        />
                    </div>
                    <h5 className='mb-5 mt-5'>3rd</h5>
                    <div className="col-6">
                        <input
                            type='text'
                            className={`form-control${errors.thirdPcHr ? ' border-danger' : ''}`}
                            {...register('thirdPcHr')}
                        />
                    </div>
                    <div className="col-6">
                        <Controller
                            control={control}
                            name='thirdPcOperatorId'
                            render={({field: {value, onChange}}) => {
                            return (
                                <ComboBox
                                    data={optionUsersType}
                                    defaultValue={getUsers(value)}
                                    onChange={(event) => onChange(event.value.id)}
                                    textField="text"
                                    dataItemKey="id"
                                    />
                                )
                            }}
                        />
                    </div>
                    <h5 className='mb-5 mt-5'>4th</h5>
                    <div className="col-6">
                        <input
                            type='text'
                            className={`form-control${errors.fourthPcHr ? ' border-danger' : ''}`}
                            {...register('fourthPcHr')}
                        />
                    </div>
                    <div className="col-6">
                        <Controller
                            control={control}
                            name='fourthPcOperatorId'
                            render={({field: {value, onChange}}) => {
                            return (
                                <ComboBox
                                    data={optionUsersType}
                                    defaultValue={getUsers(value)}
                                    onChange={(event) => onChange(event.value.id)}
                                    textField="text"
                                    dataItemKey="id"
                                    />
                                )
                            }}
                        />
                    </div>
                 </div>
               </TabStripTab>
            </TabStrip> */}
            </form>
            <DialogActionsBar>
                <button
                     className="btn btn-primary"
                    onClick={onSubmit}
                >
                    Proceed
                </button>
                <button
                    className='btn btn-outline-primary'
                    onClick={toggleDialog}
                >
                    Cancel
                </button>
            </DialogActionsBar>
        </Dialog>
    )
}

export { OperationDataModal }

