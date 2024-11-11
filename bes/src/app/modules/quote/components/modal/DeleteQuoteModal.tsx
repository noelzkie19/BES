import { Modal } from 'react-bootstrap-v5'
import { deleteQuote } from '../../api'
import { IQuote } from '../../models/quote-model'

interface IProps {
    show: boolean
    handleClose: () => void
    quoteData?: IQuote
    deleteCallback: () => void
}

const DeleteQuoteModal: React.FC<IProps> = ({ show, handleClose, quoteData, deleteCallback }) => {

    const deleteClientHandler = () => {
        if (quoteData)
            deleteQuote(quoteData)
              .then(() => deleteCallback())
    }

    return (
        <Modal show={show} onHide={handleClose}
            size="sm"
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Quote {quoteData?.number}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>You are deleting a Quote, Continue?</p>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={deleteClientHandler}
                >Proceed</button>
                <button type='button' className="btn btn-outline-primary"
                    onClick={handleClose}>
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export { DeleteQuoteModal }