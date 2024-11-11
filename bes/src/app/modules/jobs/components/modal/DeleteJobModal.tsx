import { Modal } from 'react-bootstrap-v5'
import { deleteJob } from '../../api'
import { IJobData } from '../../models/job-model'

interface IProps {
    show: boolean
    handleClose: () => void
    jobData?: IJobData
    deleteCallback: () => void
}

const DeleteJobModal: React.FC<IProps> = ({ show, handleClose, jobData, deleteCallback }) => {

    const deleteJobHandler = () => {
        if (jobData)
            deleteJob(jobData)
                .then(() => deleteCallback())
    }

    return (
        <Modal show={show} onHide={handleClose}
            size="sm"
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Job {jobData?.jobId}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Deleting the Job will remove it from the system. Continue?</p>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={deleteJobHandler}
                >Proceed</button>
                <button type='button' className='btn btn-outline-primary'
                    onClick={handleClose}>
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export { DeleteJobModal }
