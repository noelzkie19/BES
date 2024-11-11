import { Modal } from 'react-bootstrap-v5'
import { confirmQuote, printQuote } from '../../api'
// import { deleteQuote } from '../api'
import { IQuote } from '../../models/quote-model'

interface IProps {
    show: boolean
    handleClose: () => void
    quoteData?: IQuote
}

const PrintQuoteModal: React.FC<IProps> = ({ show, handleClose, quoteData }) => {
    const printQuoteHandler = () => {
        if (quoteData)
        printQuote(quoteData)
              .then(() => handleClose())
    }

    return (
        <Modal show={show} onHide={handleClose}
            size="sm"
        >
            <Modal.Header closeButton>
                <Modal.Title>Print Quote {quoteData?.number}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Successfully print a Quote?</p>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={printQuoteHandler}
                >Yes</button>
                <button type='button' className="btn btn-outline-primary"
                    onClick={handleClose}>
                    No
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export { PrintQuoteModal } 