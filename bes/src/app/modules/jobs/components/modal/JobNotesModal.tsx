import { FC, useEffect, useState } from "react"
import { JobNote, Operation } from "../../models/job-model"
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { JOB_NOTE_DEFAULT, OPERATION_DEFAULT } from "../../constant/job-default"
import { operationFormValidationSchema } from "../../validators/operation-form"
import { ComboBox } from "@progress/kendo-react-dropdowns"
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";

interface IProps {
    jobNote: JobNote
    proceedConfirm: (jobNote: JobNote) => void
    toggleDialog: () => void
}

const JobNotesModal: FC<IProps> = ({ jobNote, proceedConfirm, toggleDialog }) => {
    const {
        register,
        formState: { errors, },
        control,
        getValues
    } = useForm({
        defaultValues: jobNote ? { ...jobNote } : JOB_NOTE_DEFAULT,
        reValidateMode: 'onSubmit',
        resolver: yupResolver(operationFormValidationSchema)
    })

    const onSubmit = () => {
        proceedConfirm(getValues())
    }

    return (
        <Dialog title={`Operations Form`} onClose={toggleDialog} 
            width='90vw'>
            <form name="note">
                <div className="row">
                    <div className='col-12 pe-2  mb-4'>
                        <label className='form-label' htmlFor='number'>
                            Note
                        </label>
                        <textarea
                            className={`form-control${errors.note ? ' border-danger' : ''}`}
                            {...register('note')}
                        />
                    </div>
                </div>
            </form>
            <DialogActionsBar>
                <button
                    className='btn btn-primary'
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

export { JobNotesModal }

