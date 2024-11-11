import { useContext } from 'react'
import { Modal } from 'react-bootstrap-v5'
import { ButtonModal } from '../../../../_metronic/partials/content/button/modal/ButtonModal'
import { deleteUser } from '../api'
import { UserContext } from '../context/UserContext'
import { IUserData } from '../models/user-model'

interface IProps {
    show: boolean
    handleClose: () => void
    userData?: IUserData
    deleteCallback: () => void
}

const DeleteUserModal: React.FC<IProps> = ({ show, handleClose, userData, deleteCallback }) => {
    const {setContextToaster} = useContext(UserContext)
    const deleteUserHandler = () => {
        if (userData)
            deleteUser(userData)
            .then(() => {
                setContextToaster({
                    message: `Successfully deleted the user`,
                    header: `User Delete`,
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
                <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete user, {userData?.firstName}?</p>
            </Modal.Body>
            <Modal.Footer>
                <ButtonModal proceedHandler={deleteUserHandler}
                    cancelHandler={handleClose}></ButtonModal>
                {/* <button type='button' className='btn btn-danger' 
                    onClick={handleClose}>
                    Cancel
                </button>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={deleteUserHandler}
                >Proceed</button> */}
            </Modal.Footer>
        </Modal>
    )
}

export { DeleteUserModal }
