/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'

type Props = {
  proceedHandler: () => void,
  cancelHandler: () => void,
}

const ButtonModal: FC<Props> = ({proceedHandler, cancelHandler}) => {
  return (
    <React.Fragment>
       <button
            type='button'
            className='btn btn-primary'
            onClick={proceedHandler}>Proceed</button>
        <button type='button' className="btn btn-outline-primary"
            onClick={cancelHandler}>
            Cancel
        </button>
    </React.Fragment>
  )
}

export {ButtonModal}
