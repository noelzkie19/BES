import { Modal } from 'react-bootstrap-v5'
import { ButtonModal } from '../../../../../_metronic/partials/content/button/modal/ButtonModal'
import { deletePurchaseOrder } from '../../api'
import { IPurchaseData } from '../../models/purchase-model'

interface IProps {
    show: boolean
    handleClose: () => void
    purchaseData?: IPurchaseData
    deleteCallback: () => void
}

const DeletePurchaseModal: React.FC<IProps> = ({ show, handleClose, purchaseData, deleteCallback }) => {

    const deleteClientHandler = () => {
        if (purchaseData)
            deletePurchaseOrder(purchaseData)
                .then(() => deleteCallback())
    }

    return (
        <Modal show={show} onHide={handleClose}
            size="sm"
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Purchase {purchaseData?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>You are deleting an purchase order, Continue?</p>
            </Modal.Body>
            <Modal.Footer>
                <ButtonModal proceedHandler={deleteClientHandler}
                    cancelHandler={handleClose}></ButtonModal>

                {/* <button
                    type='button'
                    className='btn btn-primary'
                    onClick={deleteClientHandler}
                >Proceed</button>
                <button type='button' className="btn btn-outline-primary"
                    onClick={handleClose}>
                    Cancel
                </button> */}
            </Modal.Footer>
        </Modal>
    )
}

export { DeletePurchaseModal }
