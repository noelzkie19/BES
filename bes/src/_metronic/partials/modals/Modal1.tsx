import { Modal } from 'react-bootstrap-v5'
import { ButtonModal } from '../content/button/modal/ButtonModal'

interface IProps {
    show: boolean
    title: string
    message: string
    handleClose: () => void
    proceed: () => void
}

const Modal1: React.FC<IProps> = ({ show, handleClose, message, proceed, title }) => {

    return (
        <Modal show={show} onHide={handleClose}
            size="sm"
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <ButtonModal proceedHandler={proceed} cancelHandler={handleClose}></ButtonModal>
            </Modal.Footer>
        </Modal>
    )
}

export { Modal1 }
