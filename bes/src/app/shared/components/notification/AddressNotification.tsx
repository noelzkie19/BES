import React from "react"

const AddressNotification: React.FC = () => {

    return (
        <React.Fragment>
            <div
                className={`alert alert-dismissible bg-light-info d-flex flex-column flex-sm-row p-5 my-5`}
                >
                <i className={`bi bi-info-circle fs-1 my-auto me-4 text-info`}></i>
                    <div className={`d-flex flex-column text-info pe-0 pe-sm-10`}>
                        <h5 className={`mb-1 text-info`}>Note: No user address found.</h5>
                    </div>
                </div>
        </React.Fragment>
    )
}

export {AddressNotification}