import * as React from "react";

const SupplierHeader: React.FC = () => {
    return (
      <div className='mb-5'>
        <div className='row'>
          <div className='col-7'>
            <img src='/images/logo.png' alt='BES logo' className='h-70px' />
          </div>
          <div className='col-5' style={{ textAlign: 'right' }}>
            <h1>Supplier Review Report</h1>
          </div>
        </div>
      </div>
    )
}

export default SupplierHeader
