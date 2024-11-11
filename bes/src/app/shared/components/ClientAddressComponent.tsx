import React from "react"
import { ISelectedClientData } from "../../modules/jobs/models/job-model"

interface IProps {
    selectedClient?: ISelectedClientData
}

const ClientAddressComponent: React.FC<IProps> = ({ selectedClient }) => {

    const hasClient = () => {
        if (selectedClient) {
            if (selectedClient.postCode === null && selectedClient.street === null &&
                selectedClient.state === null && selectedClient.street === null) {
                    return false
                } else return true
        } else return false
    }

    return (
        <React.Fragment>
            {
                hasClient() && (
                    <div className='row align-items-center mt-6 pe-2'>
                        <div className='col-lg-3 col-md-3 col-12 mb-4'>
                            <label className='fw-bold me-2'>Address: </label>
                            {selectedClient ? <span>{selectedClient.street}</span> : null}
                        </div>
                        <div className='col-lg-3 col-md-3 col-12 mb-4'>
                            <label className='fw-bold me-2'>City: </label>
                            {selectedClient ? <span>{selectedClient.suburb}</span> : null}
                        </div>
                        <div className='col-lg-3 col-md-3 col-12 mb-4'>
                            <label className='fw-bold me-2'>State: </label>
                            {selectedClient ? <span>{selectedClient.state}</span> : null}
                        </div>
                        <div className='col-lg-3 col-md-3 col-12 mb-4'>
                            <label className='fw-bold me-2'>Post Code: </label>
                            {selectedClient ? <span>{selectedClient.postCode}</span> : null}
                        </div>
                    </div>
                )
            }
     
        </React.Fragment>
   
    )
}

export {ClientAddressComponent}