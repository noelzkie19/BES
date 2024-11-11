
import { Dialog } from "@progress/kendo-react-dialogs";
import { useContext } from 'react';
import { ScheduleContext } from '../../context/ScheduleContext';
import { JobForm } from "../../../jobs/components/JobForm";

interface IProps {
    handleClose?: () => void
}

const JobModal: React.FC<IProps> = ({ handleClose }) => {
    const { selectedJobData } = useContext(ScheduleContext)

    return (
        <Dialog title='Job Details' onClose={handleClose} width="90%" height='90%'>
            <div className='modal-body'>
                <JobForm jobData={selectedJobData} isCanEdit={false}/>
            </div>
        </Dialog >
    )
}

export { JobModal }
