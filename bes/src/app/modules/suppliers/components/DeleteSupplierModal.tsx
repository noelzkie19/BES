import { Modal } from 'react-bootstrap-v5'
import { ButtonModal } from '../../../../_metronic/partials/content/button/modal/ButtonModal'
import { deleteSupplier } from '../api'
import { ISupplierData } from '../models/supplier-model'

interface IProps {
    show: boolean
    handleClose: () => void
    supplierData?: ISupplierData
    deleteCallback: () => void
}

const DeleteSupplierModal: React.FC<IProps> = ({ show, handleClose, supplierData, deleteCallback }) => {

    const deleteClientHandler = () => {
        if (supplierData)
            deleteSupplier(supplierData).then(() => deleteCallback())
    }

    return (
        <Modal show={show} onHide={handleClose}
            size="sm"
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Client {supplierData?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>You are deleting an client, Continue?</p>
            </Modal.Body>
            <Modal.Footer>
                <ButtonModal proceedHandler={deleteClientHandler}
                    cancelHandler={handleClose}></ButtonModal>
                {/* <button
                    type='button'
                    className='btn btn-primary'
                    onClick={deleteClientHandler}
                >Proceed</button>
                <button type='button' className='btn btn-danger'
                    onClick={handleClose}>
                    Cancel
                </button> */}
            </Modal.Footer>
        </Modal>
    )
}

export { DeleteSupplierModal }
