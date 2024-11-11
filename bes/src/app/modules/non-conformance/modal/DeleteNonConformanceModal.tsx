import { Modal } from 'react-bootstrap-v5'
import { ButtonModal } from '../../../../_metronic/partials/content/button/modal/ButtonModal'
import { deleteNonConformance } from '../api'
import { INoncoformanceData } from '../models/nonconformance-model'

interface IProps {
    show: boolean
    handleClose: () => void
    nonConformanceData?: INoncoformanceData
    deleteCallback: () => void
}

const DeleteNonConformanceModal: React.FC<IProps> = ({ show, handleClose, nonConformanceData, deleteCallback }) => {

    const deleteNonConformanceHandler = () => {
        if (nonConformanceData)
            deleteNonConformance(nonConformanceData)
                .then(() => deleteCallback())
    }

    return (
        <Modal show={show} onHide={handleClose}
            size="sm"
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Non-Conformance</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Deleting the Non-Conformance will remove it from the system. Continue?</p>
            </Modal.Body>
            <Modal.Footer>
              <ButtonModal proceedHandler={deleteNonConformanceHandler}
                    cancelHandler={handleClose}></ButtonModal>
                {/* <button
                    type='button'
                    className='btn btn-primary'
                    onClick={deleteNonConformanceHandler}
                >Proceed</button>
                <button type='button' className='btn btn-outline-primary'
                    onClick={handleClose}>
                    Cancel
                </button> */}
            </Modal.Footer>
        </Modal>
    )
}

export { DeleteNonConformanceModal }
