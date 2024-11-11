import { useContext } from 'react'
import { Modal } from 'react-bootstrap-v5'
import { ButtonModal } from '../../../../_metronic/partials/content/button/modal/ButtonModal'
import { deleteRole } from '../api'
import { RoleContext } from '../context/RoleContext'
import { IRole } from '../models/role-model'

interface IProps {
    show: boolean
    handleClose: () => void
    roleData?: IRole
    deleteCallback: () => void
}

const DeleteRoleModal: React.FC<IProps> = ({ show, handleClose, roleData, deleteCallback }) => {
    const {setContextToaster} = useContext(RoleContext)
    const deleteRoleHandler = () => {
        if (roleData)
            deleteRole(roleData)
            .then(() => {
                setContextToaster({
                    message: `Successfully deleted the role`,
                    header: `Role Delete`,
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
                <Modal.Title>Delete Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete role, {roleData?.name}?</p>
            </Modal.Body>
            <Modal.Footer>
                <ButtonModal proceedHandler={deleteRoleHandler}
                    cancelHandler={handleClose}></ButtonModal>
                {/* <button type='button' className='btn btn-danger' 
                    onClick={handleClose}>
                    Cancel
                </button>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={deleteRoleHandler}
                >Proceed</button> */}
            </Modal.Footer>
        </Modal>
    )
}

export { DeleteRoleModal }
