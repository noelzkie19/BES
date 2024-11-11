import { Modal } from 'react-bootstrap-v5'
import { printQuote } from '../../api'
// import { deleteQuote } from '../api'
import { IQuote } from '../../models/quote-model'

interface IProps {
    show: boolean
    handleClose: () => void
    quoteData?: IQuote
    onSendQuotePdf: () => void
}

const SendQuotePdfModal: React.FC<IProps> = ({ show, handleClose, quoteData, onSendQuotePdf }) => {
    const sendQuotePdfHandler = () => {
        if (quoteData)
        printQuote(quoteData)
              .then(() => onSendQuotePdf())
    }

    return (
        <Modal show={show} onHide={handleClose}
            size="sm"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    { quoteData?.resend ? (
                    <span>Resend</span>) : (<span>Send</span>)} Quote Number {quoteData?.quoteNumber}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>You are sending an email Quote, Continue?</p>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={sendQuotePdfHandler}
                >Proceed</button>
                <button type='button' className="btn btn-outline-primary"
                    onClick={handleClose}>
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export { SendQuotePdfModal } 