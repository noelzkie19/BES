import { Modal } from 'react-bootstrap-v5'
import { confirmQuote } from '../../api'
// import { deleteQuote } from '../api'
import { IQuote } from '../../models/quote-model'

interface IProps {
    show: boolean
    handleClose: () => void
    quoteData?: IQuote
    confirmCallback: () => void
}

const ConfirmQuoteModal: React.FC<IProps> = ({ show, handleClose, quoteData, confirmCallback }) => {
    const confirmQuoteHandler = () => {
        if (quoteData)
            confirmQuote(quoteData)
                .then(() =>
                    confirmCallback()
                )
    }

    return (
        <Modal show={show} onHide={handleClose}
            size="sm"
        >
            <Modal.Header closeButton>
                <Modal.Title>Confirm Quote {quoteData?.number}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>You are confirming a Quote, Continue?</p>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={confirmQuoteHandler}
                >Proceed</button>
                <button type='button' className="btn btn-outline-primary"
                    onClick={handleClose}>
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export { ConfirmQuoteModal }