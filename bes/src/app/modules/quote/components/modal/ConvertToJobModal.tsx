import { Modal } from 'react-bootstrap-v5'
import { convertQuoteToJob } from '../../api'
import { IQuote } from '../../models/quote-model'

interface IProps {
    show: boolean
    handleClose: () => void
    quoteData?: IQuote
    convertCallback: () => void
}

const ConverQuoteToJobModal: React.FC<IProps> = ({ show, handleClose, quoteData, convertCallback }) => {
    const converQuoteToJobHandler = () => {
        if (quoteData)
            convertQuoteToJob(quoteData)
                .then(() =>
                convertCallback()
            )
    }

    return (
        <Modal show={show} onHide={handleClose}
            size="sm"
        >
            <Modal.Header closeButton>
                <Modal.Title>Convert Quote {quoteData?.number} to Job </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>You are converting a Quote, Continue?</p>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={converQuoteToJobHandler}
                >Proceed</button>
                <button type='button' className="btn btn-outline-primary"
                    onClick={handleClose}>
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export { ConverQuoteToJobModal }