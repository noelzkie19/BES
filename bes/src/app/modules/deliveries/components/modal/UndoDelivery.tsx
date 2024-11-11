
import { Modal } from 'react-bootstrap-v5'
import { DeliveryJob, IDeliveryData } from '../../models/delivery-model'

interface IProps {
    show: boolean
    jobData: IDeliveryData | undefined
    handleClose: () => void
    undoCallback: (Deliveryline: IDeliveryData | undefined) => void
}

const UndoDeliveryModal: React.FC<IProps> = ({ show, handleClose, jobData, undoCallback }) => {
    const undoDeliveryHandler = () => {
        undoCallback(jobData || {} as any)
    }

    return (
        <Modal show={show} onHide={handleClose}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Undo Delivery Docket #{jobData?.deliveryNumber}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>This will reverse the delivery, Continue? </p>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={undoDeliveryHandler}
                >Proceed</button>
                <button type='button' className="btn btn-outline-primary"
                    onClick={handleClose}>
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export { UndoDeliveryModal }
