import { useContext } from 'react'
import { Modal } from 'react-bootstrap-v5'
import { deleteResource } from '../api'
import { ResourceContext } from '../context/ResourceContext'
import { Resource } from '../models/resource-model'

interface IProps {
    show: boolean
    handleClose: () => void
    resourceData?: Resource
    deleteCallback: () => void
}

const DeleteResourceModal: React.FC<IProps> = ({ show, handleClose, resourceData, deleteCallback }) => {
    const {setContextToaster} = useContext(ResourceContext)
    const deleteStockHandler = () => {
        if (resourceData)
            deleteResource(resourceData)
              .then(() => 
                {
                   setContextToaster({
                    message: `Resource Deleted successfully.`,
                    header: `Resource Delete`,
                    type: 'primary',
                  })
                  deleteCallback()
                })
    }

    return (
        <Modal show={show} onHide={handleClose}
            size="sm"
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Resource {resourceData?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>You are deleting a Resource, Continue?</p>
            </Modal.Body>
            <Modal.Footer>
                <button type='button' className='btn btn-danger' 
                    onClick={handleClose}>
                    Cancel
                </button>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={deleteStockHandler}
                >Proceed</button>
            </Modal.Footer>
        </Modal>
    )
}

export { DeleteResourceModal }
