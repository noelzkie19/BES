import React from 'react'
import { KTSVG } from '../../../_metronic/helpers'

export interface IAlert {
  className?: string
  message: string
  header?: string
  type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  closeToaster?: () => void
}

const CustomAlert: React.FC<IAlert> = ({ type, message, header, className, closeToaster }) => {
  return (
    <div
      className={`alert alert-dismissible bg-light-${type} d-flex flex-column flex-sm-row p-5 my-5 ${className}`}
    >
      <i className={`bi bi-info-circle fs-1 my-auto me-4 text-${type}`}></i>
      <div className={`d-flex flex-column text-${type} pe-0 pe-sm-10`}>
        {
          header && (
            <h5 className={`mb-1 text-${type}`}>{header}</h5>
          )
        }
        <span>{message}</span>
      </div>
      <button
        type='button'
        className='position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto'
        data-bs-dismiss='alert'
        onClick={() => {if(closeToaster) closeToaster()}}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon svg-icon-2x' 
        />
      </button>  
    </div>
  )
}

export { CustomAlert }
