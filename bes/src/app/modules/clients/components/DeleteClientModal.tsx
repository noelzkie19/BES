import { Modal } from 'react-bootstrap-v5'
import { ButtonModal } from '../../../../_metronic/partials/content/button/modal/ButtonModal'
import { deleteClient } from '../api'
import { IClientData } from '../models/client-model'

interface IProps {
    show: boolean
    handleClose: () => void
    clientData?: IClientData
    deleteCallback: () => void
}

const DeleteClientModal: React.FC<IProps> = ({ show, handleClose, clientData, deleteCallback }) => {

    const deleteClientHandler = () => {
        if (clientData)
            deleteClient(clientData)
              .then(() => deleteCallback())
    }

    return (
        <Modal show={show} onHide={handleClose}
            size="sm"
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Client {clientData?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>You are deleting an client, Continue?</p>
            </Modal.Body>
            <Modal.Footer>
                <ButtonModal proceedHandler={deleteClientHandler}
                    cancelHandler={handleClose}></ButtonModal>
            </Modal.Footer>
        </Modal>
    )
}

export { DeleteClientModal }
