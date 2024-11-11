/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import { Modal1 } from '../../../modals/Modal1'

type Props = {
  title: string,
  modalMessage: string,
  deleteHandler: () => void,
  disabled: boolean
  className?: string
}

const DeleteButton: FC<Props> = ({deleteHandler, title, modalMessage, disabled, className}) => {
  const [show, setShow] = useState<boolean>(false)

  return (
    <React.Fragment>
        <Modal1 title={title} 
            show={show} 
            message={modalMessage}
            handleClose={() => setShow(false)}
            proceed={deleteHandler}>
        </Modal1>
       <button
            type='button'
            className={`btn btn-primary col-auto btn-action ${className}`}
            disabled={disabled}
            onClick={() => setShow(true)}>Delete</button>
    </React.Fragment>
  )
}

export {DeleteButton}
