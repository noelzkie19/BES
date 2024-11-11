import { Modal } from 'react-bootstrap-v5'
import { deleteStock } from '../api'
import { IStocks } from '../models/stock-model'

interface IProps {
    show: boolean
    handleClose: () => void
    stockData?: IStocks
    deleteCallback: () => void
}

const DeleteStockModal: React.FC<IProps> = ({ show, handleClose, stockData, deleteCallback }) => {

    const deleteStockHandler = () => {
        if (stockData)
            deleteStock(stockData)
              .then(() => deleteCallback())
    }

    return (
        <Modal show={show} onHide={handleClose}
            size="sm"
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Stock {stockData?.description}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>You are deleting a stock, Continue?</p>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={deleteStockHandler}
                >Proceed</button>
                <button type='button' className='btn btn-outline-primary'
                    onClick={handleClose}>
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export { DeleteStockModal }
