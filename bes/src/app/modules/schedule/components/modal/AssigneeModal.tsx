
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { IUnAllocatedJob } from '../../models/schedule-model';
import { Controller, useForm } from 'react-hook-form';
import { useContext } from 'react';
import { ScheduleContext } from '../../context/ScheduleContext';
import { ComboBox } from '@progress/kendo-react-dropdowns';
import { transforStaffOption } from '../../transformer/schedule-transformer';

interface IProps {
    handleClose?: () => void
    jobData?: IUnAllocatedJob
    proceedCallback: (assignee: number) => void
}

const AssigneeModal: React.FC<IProps> = ({ handleClose, jobData, proceedCallback }) => {
    const { handleSubmit, control } = useForm()
    const { users } = useContext(ScheduleContext)

    const onSubmit = (value: any) => {
        proceedCallback(value.assign.id)
    }

    return (
        <Dialog title='Assignee' onClose={handleClose}>
            <form name='history' onSubmit={handleSubmit(onSubmit)}>
                <div className='modal-body'>
                    <div className='row'>
                        <div className="col-12 col-lg-12">
                            <div className="d-flex flex-row">
                                <Controller
                                    control={control}
                                    name="assign"
                                    render={({ field: { value, onChange } }) => {
                                        return <ComboBox
                                            data={transforStaffOption(users) || []}
                                            value={(transforStaffOption(users) || []).find((c: any) => c.id === value)}
                                            onChange={(e) => onChange(e.value)}
                                            textField="text"
                                            dataItemKey="id"
                                        />
                                    }} />
                            </div>
                        </div>
                    </div>
                </div>
               
                <DialogActionsBar>
                    <button 
                        type="submit"
                        className="btn btn-primary">
                        Procceed
                    </button>
                    <button className="btn btn-outline-primary"
                        onClick={handleClose}>
                        Close
                    </button>
                </DialogActionsBar>
            </form>
        </Dialog >
    )
}

export { AssigneeModal }
